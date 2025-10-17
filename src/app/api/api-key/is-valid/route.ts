import { prisma } from '@/lib/prisma';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { apiKeyMessages } from '../../helpers/messages/apiKeyMessages';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        { message: apiKeyMessages.MISSING_HEADER },
        { status: httpStatusEnum.UNAUTHORIZED, headers: CORS_HEADERS }
      );
    }

    const findApiKey = await prisma.apiKey.findFirst({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!findApiKey) {
      return NextResponse.json(
        { message: apiKeyMessages.INVALID_KEY },
        { status: httpStatusEnum.UNAUTHORIZED, headers: CORS_HEADERS }
      );
    }

    if (!findApiKey.active) {
      return NextResponse.json(
        { message: apiKeyMessages.INACTIVE_KEY },
        { status: httpStatusEnum.UNAUTHORIZED, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { message: apiKeyMessages.VALID_KEY },
      { status: httpStatusEnum.OK, headers: CORS_HEADERS }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `${apiKeyMessages.INTERNAL_ERROR}: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR, headers: CORS_HEADERS }
    );
  }
}
