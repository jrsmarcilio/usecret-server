/*
  Warnings:

  - You are about to drop the column `username` on the `Root` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Root` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Root_username_key` ON `Root`;

-- AlterTable
ALTER TABLE `Root` DROP COLUMN `username`;

-- CreateIndex
CREATE UNIQUE INDEX `Root_email_key` ON `Root`(`email`);
