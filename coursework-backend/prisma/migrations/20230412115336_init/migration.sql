/*
  Warnings:

  - Added the required column `seat_count` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "seat_count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "price" INTEGER NOT NULL;
