/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Point` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Point_name_key" ON "Point"("name");
