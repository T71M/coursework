/*
  Warnings:

  - Added the required column `endTime` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekDayStart` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekStop` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "weekDayStart" "Weekday" NOT NULL,
ADD COLUMN     "weekStop" "Weekday" NOT NULL;
