/*
  Warnings:

  - You are about to drop the column `region` on the `Point` table. All the data in the column will be lost.
  - Added the required column `regionId` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Route_endPointId_key";

-- DropIndex
DROP INDEX "Route_startPointId_key";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "region",
ADD COLUMN     "regionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
