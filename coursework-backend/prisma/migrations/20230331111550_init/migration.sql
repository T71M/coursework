/*
  Warnings:

  - You are about to drop the column `seat_number` on the `Order` table. All the data in the column will be lost.
  - Added the required column `seatId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "seat_number",
ADD COLUMN     "seatId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "BusSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
