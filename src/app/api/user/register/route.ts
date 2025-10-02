import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { generateToken } from '../../helpers/jwt';
import registerUserSchema from '../schemas/regisetrUserSchema';
import { serialize } from 'cookie';
import { UserType } from '@/types/userType';
import { verifyUserRecentlyDeleteAccount } from '../../helpers/userDeleteAccountHelper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationDtoResult = registerUserSchema.safeParse(body);

    if (!validationDtoResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          details: validationDtoResult.error.issues,
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        normalizedEmail: validationDtoResult.data.email.toUpperCase(),
      },
    });

    if (existingUser && !existingUser.deletedProfile) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const hashedPassword = await bcrypt.hash(
      validationDtoResult.data.password,
      10
    );

    const newUser = {
      ...validationDtoResult.data,
      password: hashedPassword,
    };

    let userResponse: UserType | null = null;

    if (existingUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { normalizedEmail, password, ...user } = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          normalizedEmail: validationDtoResult.data.email.toUpperCase(),
          deletedProfile: false,
          ...newUser,
        },
      });
      userResponse = {
        recentlyDeleteAccount: await verifyUserRecentlyDeleteAccount(
          existingUser.id
        ),
        ...user,
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { normalizedEmail, password, ...user } = await prisma.user.create({
        data: {
          normalizedEmail: validationDtoResult.data.email.toUpperCase(),
          ...newUser,
        },
      });

      userResponse = user;
    }

    const token = generateToken(userResponse.id, userResponse.email);

    if (!token) {
      return NextResponse.json(
        {
          message: 'InternalServerError|Register|Error: Error generating token',
        },
        { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
      );
    }

    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 60, // 30 minutos
    });

    const response = NextResponse.json(
      { content: userResponse },
      { status: httpStatusEnum.CREATED }
    );
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: `InternalServerError|RegisterUser|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
