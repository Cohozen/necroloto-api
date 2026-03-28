-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('BET_CREATED', 'CELEBRITY_ADDED', 'POINTS_EARNED', 'MEMBER_JOINED');

-- CreateTable
CREATE TABLE "CircleActivity" (
    "id" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CircleActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CircleActivity" ADD CONSTRAINT "CircleActivity_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleActivity" ADD CONSTRAINT "CircleActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
