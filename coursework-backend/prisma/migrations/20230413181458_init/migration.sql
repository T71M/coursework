-- CreateTable
CREATE TABLE "BusComfort" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BusComfort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusConnectedComforts" (
    "busId" INTEGER NOT NULL,
    "comfortId" INTEGER NOT NULL,

    CONSTRAINT "BusConnectedComforts_pkey" PRIMARY KEY ("busId","comfortId")
);

-- AddForeignKey
ALTER TABLE "BusConnectedComforts" ADD CONSTRAINT "BusConnectedComforts_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusConnectedComforts" ADD CONSTRAINT "BusConnectedComforts_comfortId_fkey" FOREIGN KEY ("comfortId") REFERENCES "BusComfort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
