/*
  Warnings:

  - You are about to drop the column `Notes` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` DROP COLUMN `Notes`,
    DROP COLUMN `clientId`,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL DEFAULT 'New Account';
