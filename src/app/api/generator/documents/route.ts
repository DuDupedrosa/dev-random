import { prisma } from '@/lib/prisma';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentMonthRange } from '../../helpers/getCurrentMonthRange';
import { userExceededLimit } from '@/shared/helpers/usageHelper';
import { DocumentsEnum, documentsEnum } from '@/shared/enums/documentsEnum';
import { generateRandomDocument } from '@/shared/helpers/generateRandomDocumentHelper';
import { apiKeyMessages } from '../../helpers/messages/apiKeyMessages';

const validDocumentsTypes = Object.values(documentsEnum) as number[];

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        { message: apiKeyMessages.MISSING_HEADER },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const findApiKey = await prisma.apiKey.findFirst({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!findApiKey) {
      return NextResponse.json(
        { message: apiKeyMessages.INVALID_KEY },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    if (!findApiKey.active) {
      return NextResponse.json(
        { message: apiKeyMessages.INACTIVE_KEY },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const documentTypeParam = request.nextUrl.searchParams.get('documentType');
    if (!documentTypeParam) {
      return NextResponse.json(
        { message: 'Required query param documentType' },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const documentType = Number(documentTypeParam);
    if (!validDocumentsTypes.includes(documentType)) {
      return NextResponse.json(
        {
          message: `Invalid document type. Valid types: ${Object.values(
            documentsEnum
          )}`,
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const mask = request.nextUrl.searchParams.get('mask');
    if (mask && mask !== 'true' && mask !== 'false') {
      return NextResponse.json(
        {
          message:
            'Invalid query param mask. Only mask = true or mask = false are valid.',
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const { start, end } = getCurrentMonthRange();

    const findUsage = await prisma.usage.findFirst({
      where: {
        userId: findApiKey.userId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    if (!findUsage) {
      await prisma.usage.create({
        data: {
          userId: findApiKey.userId,
          count: 1,
        },
      });
    } else {
      const newCount = findUsage.count + 1;

      if (userExceededLimit(findApiKey.user.planType, newCount)) {
        return NextResponse.json(
          {
            message: apiKeyMessages.MAX_LIMIT_PLAN,
          },
          { status: httpStatusEnum.BAD_REQUEST }
        );
      }

      await prisma.usage.update({
        where: { id: findUsage.id },
        data: {
          count: newCount,
        },
      });
    }

    return NextResponse.json(
      {
        content: generateRandomDocument(
          documentType as DocumentsEnum,
          mask ? mask === 'true' : true
        ),
      },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|Generator|Documents|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
