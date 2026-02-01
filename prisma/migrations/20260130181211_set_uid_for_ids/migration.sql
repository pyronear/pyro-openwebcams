/*
  Warnings:

  - The primary key for the `IntegrationStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Webcam` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Webcam" DROP CONSTRAINT "Webcam_integrationStatusId_fkey";

-- AlterTable
ALTER TABLE "IntegrationStatus" DROP CONSTRAINT "IntegrationStatus_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "IntegrationStatus_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "IntegrationStatus_id_seq";

-- AlterTable
ALTER TABLE "Webcam" DROP CONSTRAINT "Webcam_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "integrationStatusId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Webcam_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Webcam_id_seq";

-- AddForeignKey
ALTER TABLE "Webcam" ADD CONSTRAINT "Webcam_integrationStatusId_fkey" FOREIGN KEY ("integrationStatusId") REFERENCES "IntegrationStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
