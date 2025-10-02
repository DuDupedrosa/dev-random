import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import loginUserSchema from '../schemas/loginUserSchema';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '../../helpers/jwt';
import { serialize } from 'cookie';
import { UserType } from '@/types/userType';
import { verifyUserRecentlyDeleteAccount } from '../../helpers/userDeleteAccountHelper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationDtoResult = loginUserSchema.safeParse(body);

    if (!validationDtoResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          details: validationDtoResult.error.issues,
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: {
        normalizedEmail: validationDtoResult.data.email.toUpperCase(),
      },
    });

    if (!findUser || (findUser && findUser.deletedProfile)) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    const isPasswordValid = bcrypt.compareSync(
      validationDtoResult.data.password,
      findUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, normalizedEmail, ...user } = findUser;

    const token = generateToken(findUser.id, findUser.email);

    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 60, // 30 minutos
    });

    const userResponse: UserType = {
      recentlyDeleteAccount: await verifyUserRecentlyDeleteAccount(findUser.id),
      ...user,
    };

    const response = NextResponse.json(
      { content: userResponse },
      { status: httpStatusEnum.OK }
    );
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|Login|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
