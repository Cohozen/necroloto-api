/*
  Warnings:

  - A unique constraint covering the columns `[userId,circleId,year]` on the table `Bet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CircleStatus" AS ENUM ('OPEN', 'LOCKED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "CircleVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- DropIndex
DROP INDEX "Bet_userId_year_key";

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "circleId" TEXT;

-- CreateTable
CREATE TABLE "Circle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "visibility" "CircleVisibility" NOT NULL DEFAULT 'PRIVATE',
    "status" "CircleStatus" NOT NULL DEFAULT 'OPEN',
    "code" TEXT,
    "allowNewBet" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_circleId_key" ON "Membership"("userId", "circleId");

-- CreateIndex
CREATE UNIQUE INDEX "Bet_userId_circleId_year_key" ON "Bet"("userId", "circleId", "year");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
