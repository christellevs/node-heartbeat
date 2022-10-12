-- CreateTable
CREATE TABLE "Heartbeat" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "heartbeatId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    CONSTRAINT "Heartbeat_pkey" PRIMARY KEY ("id")
);
