-- CreateEnum
CREATE TYPE "bus_condition" AS ENUM ('excellent', 'good', 'bad');

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "condition" "bus_condition" NOT NULL DEFAULT 'excellent',
    "seats_count" INTEGER NOT NULL DEFAULT 30,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startPointId" INTEGER NOT NULL,
    "endPointId" INTEGER NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "routeId" INTEGER NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bus_name_key" ON "Bus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Route_startPointId_key" ON "Route"("startPointId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_endPointId_key" ON "Route"("endPointId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_routeId_key" ON "Order"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_startPointId_fkey" FOREIGN KEY ("startPointId") REFERENCES "Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_endPointId_fkey" FOREIGN KEY ("endPointId") REFERENCES "Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
