-- AlterTable
ALTER TABLE "Bus" ALTER COLUMN "seats_count" DROP DEFAULT;

-- CreateTable
CREATE TABLE "BusSeat" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "bus_id" INTEGER NOT NULL,

    CONSTRAINT "BusSeat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusSeat" ADD CONSTRAINT "BusSeat_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
