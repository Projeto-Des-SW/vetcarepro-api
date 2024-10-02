/*
  Warnings:

  - Made the column `clinic_id` on table `schedules` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_clinic_id_fkey";

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "clinic_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
