/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Webcam` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Webcam" ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Webcam_url_key" ON "Webcam"("url");
