-- CreateTable
CREATE TABLE "Webcam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "angleOfView" DOUBLE PRECISION NOT NULL,
    "elevation" INTEGER,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "refreshSeconds" INTEGER,
    "comments" TEXT,
    "integrationStatusId" INTEGER NOT NULL,

    CONSTRAINT "Webcam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationStatus" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "labelKey" TEXT NOT NULL,

    CONSTRAINT "IntegrationStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Webcam_name_key" ON "Webcam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationStatus_code_key" ON "IntegrationStatus"("code");

-- AddForeignKey
ALTER TABLE "Webcam" ADD CONSTRAINT "Webcam_integrationStatusId_fkey" FOREIGN KEY ("integrationStatusId") REFERENCES "IntegrationStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
