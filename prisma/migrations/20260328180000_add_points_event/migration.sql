-- CreateTable
CREATE TABLE "PointsEvent" (
    "id" TEXT NOT NULL,
    "betId" TEXT NOT NULL,
    "celebrityId" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointsEvent" ADD CONSTRAINT "PointsEvent_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsEvent" ADD CONSTRAINT "PointsEvent_celebrityId_fkey" FOREIGN KEY ("celebrityId") REFERENCES "Celebrity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Backfill: insert a PointsEvent for each CelebritiesOnBet entry that already has points
INSERT INTO "PointsEvent" ("id", "betId", "celebrityId", "points", "reason", "createdAt")
SELECT
    gen_random_uuid(),
    cob."betId",
    cob."celebrityId",
    cob."points",
    'backfill',
    COALESCE(c."death", cob."updatedAt")
FROM "CelebritiesOnBet" cob
JOIN "Celebrity" c ON c."id" = cob."celebrityId"
WHERE cob."points" > 0;
