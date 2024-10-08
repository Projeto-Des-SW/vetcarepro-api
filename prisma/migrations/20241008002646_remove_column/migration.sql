/*
  Warnings:

  - You are about to drop the column `tier` on the `clinics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "tier";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tier" "Tiers" NOT NULL DEFAULT 'TIER_ONE';
