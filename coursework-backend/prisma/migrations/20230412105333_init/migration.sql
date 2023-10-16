/*
  Warnings:

  - You are about to drop the `BusSeat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusSeat" DROP CONSTRAINT "BusSeat_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_seatId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "BusSeat";
