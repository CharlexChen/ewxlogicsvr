/*
  Warnings:

  - You are about to drop the `pipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pipe`;

-- CreateTable
CREATE TABLE `Flow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `isDeleted` TINYINT NOT NULL DEFAULT 0,
    `uid` INTEGER NULL,
    `flow` TEXT NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
