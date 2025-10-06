import { prisma } from '@/lib/prisma';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { apiKeyMessages } from '../../helpers/messages/apiKeyMessages';

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        {
          message: apiKeyMessages.MISSING_HEADER,
        },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    const findApiKey = await prisma.apiKey.findFirst({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!findApiKey) {
      return NextResponse.json(
        {
          message: apiKeyMessages.INVALID_KEY,
        },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    if (!findApiKey.active) {
      return NextResponse.json(
        { message: apiKeyMessages.INACTIVE_KEY },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    return NextResponse.json(
      { message: apiKeyMessages.VALID_KEY },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `${apiKeyMessages.INTERNAL_ERROR}: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
