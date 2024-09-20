/*
  Warnings:

  - The `status_schedule` column on the `schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusSchedule" AS ENUM ('SCHEDULED', 'EXPIRES', 'FINISHED');

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "status_schedule",
ADD COLUMN     "status_schedule" "StatusSchedule" NOT NULL DEFAULT 'SCHEDULED';
