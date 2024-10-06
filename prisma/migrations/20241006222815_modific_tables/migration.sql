-- CreateEnum
CREATE TYPE "Tiers" AS ENUM ('TIER_ONE', 'TIER_TWO', 'TIER_THREE');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('MANAGER', 'VETERINARY', 'SECRETARY');

-- AlterTable
ALTER TABLE "clinics" ADD COLUMN     "tier" "Tiers" NOT NULL DEFAULT 'TIER_ONE';

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'MANAGER';
