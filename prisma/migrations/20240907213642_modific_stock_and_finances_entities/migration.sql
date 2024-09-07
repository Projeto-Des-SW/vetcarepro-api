/*
  Warnings:

  - You are about to drop the column `date` on the `products_stock` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `purchases_sales` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,clinic_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,clinic_id]` on the table `products_stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,clinic_id]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `products_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `products_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `products_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_stock_id` to the `purchases_sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "services_title_key";

-- AlterTable
ALTER TABLE "products_stock" DROP COLUMN "date",
ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "purchases_sales" DROP COLUMN "date",
ADD COLUMN     "product_stock_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patients_name_clinic_id_key" ON "patients"("name", "clinic_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_stock_title_clinic_id_key" ON "products_stock"("title", "clinic_id");

-- CreateIndex
CREATE UNIQUE INDEX "services_title_clinic_id_key" ON "services"("title", "clinic_id");

-- AddForeignKey
ALTER TABLE "purchases_sales" ADD CONSTRAINT "purchases_sales_product_stock_id_fkey" FOREIGN KEY ("product_stock_id") REFERENCES "products_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
