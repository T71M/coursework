-- DropForeignKey
ALTER TABLE "BusConnectedComforts" DROP CONSTRAINT "BusConnectedComforts_busId_fkey";

-- DropForeignKey
ALTER TABLE "BusConnectedComforts" DROP CONSTRAINT "BusConnectedComforts_comfortId_fkey";

-- AddForeignKey
ALTER TABLE "BusConnectedComforts" ADD CONSTRAINT "BusConnectedComforts_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusConnectedComforts" ADD CONSTRAINT "BusConnectedComforts_comfortId_fkey" FOREIGN KEY ("comfortId") REFERENCES "BusComfort"("id") ON DELETE CASCADE ON UPDATE CASCADE;
