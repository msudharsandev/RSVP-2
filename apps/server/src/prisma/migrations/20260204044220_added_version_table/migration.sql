-- AlterTable
ALTER TABLE `events` MODIFY `description` VARCHAR(1000) NULL;

-- CreateTable
CREATE TABLE `appversion` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
