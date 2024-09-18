/*
  Warnings:

  - You are about to drop the `products_stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases_sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_stock" DROP CONSTRAINT "products_stock_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases_sales" DROP CONSTRAINT "purchases_sales_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases_sales" DROP CONSTRAINT "purchases_sales_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases_sales" DROP CONSTRAINT "purchases_sales_product_stock_id_fkey";

-- DropTable
DROP TABLE "products_stock";

-- DropTable
DROP TABLE "purchases_sales";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clinic_id" TEXT NOT NULL,
    "sale_id" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clinic_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_title_clinic_id_key" ON "products"("title", "clinic_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
