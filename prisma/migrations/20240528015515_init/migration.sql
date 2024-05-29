/*
  Warnings:

  - You are about to drop the `pipeitem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `flow` to the `Pipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pipe` ADD COLUMN `flow` TEXT NOT NULL,
    ADD COLUMN `isDeleted` TINYINT NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `pipeitem`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `isDeleted` TINYINT NOT NULL DEFAULT 0,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
