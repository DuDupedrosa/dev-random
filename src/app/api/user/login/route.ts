import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import loginUserSchema from '../schemas/loginUserSchema';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { User } from '@/types/user';
import { generateToken } from '../../helpers/jwt';

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

    if (!findUser) {
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
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, normalizedEmail, ...user } = findUser;

    const response: {
      user: User;
      token: string;
    } = {
      user: user,
      token: generateToken(findUser.id, findUser.email),
    };

    return NextResponse.json(
      { content: response },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|Login|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
