import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/user';
import { verifyToken } from '../helpers/jwt';

export async function GET(request: NextRequest) {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = findUser;

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
