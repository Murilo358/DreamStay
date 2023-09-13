/*
  Warnings:

  - Added the required column `lat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL;
