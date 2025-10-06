import { httpStatusEnum } from "@/shared/enums/httpStatusEnum";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "✅ DevRandom API is active and ready to handle requests" },
    { status: httpStatusEnum.OK }
  );
}
