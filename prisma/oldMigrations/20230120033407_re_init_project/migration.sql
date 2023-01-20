/*
  Warnings:

  - You are about to drop the column `URL` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userGroupId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the column `userGroupId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rootId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rootId` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rootId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rootId` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userGroupId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `URL`,
    DROP COLUMN `categoryId`,
    DROP COLUMN `userGroupId`,
    ADD COLUMN `rootId` INTEGER NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `private` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `rootId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `accountId`,
    DROP COLUMN `userId`,
    ADD COLUMN `rootId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userGroupId`,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `rootId` INTEGER NOT NULL,
    ALTER COLUMN `profileId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `UserGroup` ADD COLUMN `rootId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Client`;

-- CreateTable
CREATE TABLE `Root` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NULL DEFAULT 'Root',
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Root_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserToUserGroup` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserToUserGroup_AB_unique`(`A`, `B`),
    INDEX `_UserToUserGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AccountToUserGroup` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AccountToUserGroup_AB_unique`(`A`, `B`),
    INDEX `_AccountToUserGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rootId_fkey` FOREIGN KEY (`rootId`) REFERENCES `Root`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_rootId_fkey` FOREIGN KEY (`rootId`) REFERENCES `Root`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroup` ADD CONSTRAINT `UserGroup_rootId_fkey` FOREIGN KEY (`rootId`) REFERENCES `Root`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_rootId_fkey` FOREIGN KEY (`rootId`) REFERENCES `Root`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_rootId_fkey` FOREIGN KEY (`rootId`) REFERENCES `Root`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToUserGroup` ADD CONSTRAINT `_UserToUserGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToUserGroup` ADD CONSTRAINT `_UserToUserGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToUserGroup` ADD CONSTRAINT `_AccountToUserGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccountToUserGroup` ADD CONSTRAINT `_AccountToUserGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
