import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../helpers/jwt';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { prisma } from '@/lib/prisma';

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

    await prisma.user.update({
      where: { id: findUser.id },
      data: {
        deletedProfile: true,
      },
    });
    await prisma.requestDeleteProfileLogs.create({
      data: {
        userId: findUser.id,
        explanation: body.reason ?? null,
      },
    });
    await prisma.apiKey.deleteMany({ where: { userId: findUser.id } });

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
      { message: `InternalServerError|DeleteUser|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
