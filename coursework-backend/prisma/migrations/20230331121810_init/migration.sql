-- DropForeignKey
ALTER TABLE "BusSeat" DROP CONSTRAINT "BusSeat_bus_id_fkey";

-- AddForeignKey
ALTER TABLE "BusSeat" ADD CONSTRAINT "BusSeat_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
