-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "normalizedEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT,
    "planType" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedProfile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ApiKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Usage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RequestDeleteProfileLogs" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestDeleteProfileLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_normalizedEmail_key" ON "public"."User"("normalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "public"."ApiKey"("key");

-- AddForeignKey
ALTER TABLE "public"."ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RequestDeleteProfileLogs" ADD CONSTRAINT "RequestDeleteProfileLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
