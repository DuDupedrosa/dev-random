import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/user';
import { verifyToken } from '../helpers/jwt';
import { updateUserSchema } from './schemas/updateUserSchema';

const userNotFoundMessage = 'User not found';
const unauthorized = 'Unauthorized';

export async function GET(request: NextRequest) {
  try {
    const authenticate = verifyToken('', request);

    if (!authenticate.valid) {
      return NextResponse.json(
        { message: unauthorized },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { id: authenticate.decoded?.id },
    });

    if (!findUser) {
      return NextResponse.json(
        { message: userNotFoundMessage },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, normalizedEmail, ...user } = findUser;

    const response: User = user;

    return NextResponse.json(
      { content: response },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|GetUser|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authenticate = verifyToken('', request);

    if (!authenticate.valid) {
      return NextResponse.json(
        { message: unauthorized },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { id: authenticate.decoded?.id },
    });

    if (!findUser) {
      return NextResponse.json(
        { message: userNotFoundMessage },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    const body = await request.json();
    const validationDtoResult = updateUserSchema.safeParse(body);

    if (!validationDtoResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          details: validationDtoResult.error.issues,
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: findUser.id },
      data: {
        name: validationDtoResult.data.name,
        lastName: validationDtoResult.data.lastName,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, normalizedEmail, ...user } = updatedUser;

    const response: User = user;

    return NextResponse.json(
      { content: response },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|UpdateUser|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticate = verifyToken('', request);

    if (!authenticate.valid) {
      return NextResponse.json(
        { message: unauthorized },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { id: authenticate.decoded?.id },
    });

    if (!findUser) {
      return NextResponse.json(
        { message: userNotFoundMessage },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    await prisma.user.delete({ where: { id: findUser.id } });

    return NextResponse.json({ content: null }, { status: httpStatusEnum.OK });
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|DeleteUser|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
