/*
  Warnings:

  - Made the column `position` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salary` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status_schedule` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "salary" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "status_schedule" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "amount" SET DATA TYPE TEXT;
