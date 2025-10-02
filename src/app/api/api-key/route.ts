import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../helpers/jwt';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import regenerateApiKetSchema from './schemas/regenerateApiKeySchema';

const userNotFoundMessage = 'User not found';
const unauthorized = 'Unauthorized';
const notFoundApiKey = 'Not fund Api Key';

export async function POST(request: NextRequest) {
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

    if (process.env.ALLOWED_REGISTER_MANY_API_KEYS === 'false') {
      const userApiKey = await prisma.apiKey.findFirst({
        where: { userId: findUser.id },
      });

      if (userApiKey) {
        return NextResponse.json(
          { message: 'User already register an ApiKey' },
          { status: httpStatusEnum.BAD_REQUEST }
        );
      }
    } else {
      const userApiKeysList = await prisma.apiKey.findMany({
        where: { userId: findUser.id },
      });

      if (userApiKeysList.length === 5) {
        return NextResponse.json(
          { message: 'Max ApiKey limit of five' },
          { status: httpStatusEnum.BAD_REQUEST }
        );
      }
    }

    const createdApiKey = await prisma.apiKey.create({
      data: {
        key: nanoid(36),
        userId: findUser.id,
      },
    });

    return NextResponse.json(
      { content: createdApiKey },
      { status: httpStatusEnum.CREATED }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|ApiKey|Create|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}

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

    let response;

    if (process.env.ALLOWED_REGISTER_MANY_API_KEYS === 'true') {
      response = await prisma.apiKey.findMany({
        where: { userId: findUser.id },
      });
    } else {
      response = await prisma.apiKey.findFirst({
        where: { userId: findUser.id },
      });
    }

    return NextResponse.json(
      { content: response },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|ApiKey|Get|Error: ${err}` },
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
    const validationDtoResult = regenerateApiKetSchema.safeParse(body);

    if (!validationDtoResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          details: validationDtoResult.error.issues,
        },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const findApiKey = await prisma.apiKey.findFirst({
      where: { id: validationDtoResult.data.apiKeyId },
    });

    if (!findApiKey) {
      return NextResponse.json(
        { message: notFoundApiKey },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    if (findApiKey.userId !== findUser.id) {
      return NextResponse.json(
        { message: unauthorized },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    const newApiKey = await prisma.apiKey.update({
      where: { id: findApiKey.id },
      data: {
        key: nanoid(36),
      },
    });

    return NextResponse.json(
      { content: newApiKey },
      { status: httpStatusEnum.OK }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|ApiKey|Regenerate|Error: ${err}` },
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

    const apiKeyId = request.nextUrl.searchParams.get('id');

    if (!apiKeyId) {
      return NextResponse.json(
        { message: 'Required request params apiKeyId' },
        { status: httpStatusEnum.BAD_REQUEST }
      );
    }

    const findApiKey = await prisma.apiKey.findFirst({
      where: { id: apiKeyId },
    });

    if (!findApiKey) {
      return NextResponse.json(
        { message: notFoundApiKey },
        { status: httpStatusEnum.NOT_FOUND }
      );
    }

    if (findApiKey.userId !== findUser.id) {
      return NextResponse.json(
        { message: unauthorized },
        { status: httpStatusEnum.UNAUTHORIZED }
      );
    }

    await prisma.apiKey.delete({ where: { id: findApiKey.id } });

    return NextResponse.json({ content: null }, { status: httpStatusEnum.OK });
  } catch (err) {
    return NextResponse.json(
      { message: `InternalServerError|ApiKey|Regenerate|Error: ${err}` },
      { status: httpStatusEnum.INTERNAL_SERVER_ERROR }
    );
  }
}
