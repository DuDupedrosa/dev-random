import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { User } from '@/types/user';
import { generateToken } from '../../helpers/jwt';
import registerUserSchema from '../schemas/regisetrUserSchema';
import { serialize } from 'cookie';

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

    if (existingUser) {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { normalizedEmail, password, ...user } = await prisma.user.create({
      data: {
        normalizedEmail: validationDtoResult.data.email.toUpperCase(),
        ...newUser,
      },
    });

    const token = generateToken(user.id, user.email);

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
      { content: user },
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
