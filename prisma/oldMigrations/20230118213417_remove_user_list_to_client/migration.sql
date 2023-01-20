/*
  Warnings:

  - You are about to drop the column `clientId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_clientId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `clientId`;
