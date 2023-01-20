/*
  Warnings:

  - Made the column `profileId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `userGroupId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `profileId` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Teste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Teste_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
