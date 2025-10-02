import { prisma } from '@/lib/prisma';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../helpers/jwt';
import { getCurrentMonthRange } from '../../helpers/getCurrentMonthRange';
import { UsageType } from '@/types/usageType';

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

    const { start, end } = getCurrentMonthRange();

    const findUsage = await prisma.usage.findFirst({
      where: {
        userId: findUser.id,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    // pegando o último registro da tabela usage ( se existir )
    if (!findUsage) {
      const lastUsage = await prisma.usage.findFirst({
        where: { userId: findUser.id },
        orderBy: { createdAt: 'desc' },
      });

      if (lastUsage) {
        const response: UsageType = {
          count: 0,
          createdAt: lastUsage.createdAt,
          updatedAt: lastUsage.updatedAt,
        };

        return NextResponse.json(
          {
            content: response,
          },
          { status: httpStatusEnum.OK }
        );
      }
    }

    return NextResponse.json(
      { content: findUsage },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|ApiKey|Usage|Get|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
