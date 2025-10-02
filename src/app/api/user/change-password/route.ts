import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../helpers/jwt';
import { prisma } from '@/lib/prisma';
import changePasswordSchema from '../schemas/changePasswordSchema';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const authenticate = verifyToken('', request);

    if (!authenticate.valid) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { id: authenticate.decoded?.id },
    });

    if (!findUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    const body = await request.json();
    const validationDtoResult = changePasswordSchema.safeParse(body);

    if (!validationDtoResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          details: validationDtoResult.error.issues,
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const { currentPassword, newPassword } = validationDtoResult.data;

    const passwordIsValid = await bcrypt.compare(
      currentPassword,
      findUser.password
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: 'Invalid current password' },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { message: 'New password must be different the current password' },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: findUser.id },
      data: {
        password: hashPassword,
      },
    });

    const response = NextResponse.json(
      { content: null },
      { status: httpStatusEnum.OK }
    );

    response.headers.set(
      'Set-Cookie',
      'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure'
    );

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|ChangePassword|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
