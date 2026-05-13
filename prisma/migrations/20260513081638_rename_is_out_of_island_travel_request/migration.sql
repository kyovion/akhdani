/*
  Warnings:

  - You are about to drop the column `isOutIsland` on the `TravelRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TravelRequest" DROP COLUMN "isOutIsland",
ADD COLUMN     "isOutOfIsland" BOOLEAN NOT NULL DEFAULT false;
