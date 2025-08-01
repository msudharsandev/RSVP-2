/*
  Warnings:

  - You are about to drop the column `category` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_participation_enabled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `magic_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `cohosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `updates` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[primary_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `capacity` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cohosts` DROP FOREIGN KEY `cohosts_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `cohosts` DROP FOREIGN KEY `cohosts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `updates` DROP FOREIGN KEY `updates_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `updates` DROP FOREIGN KEY `updates_user_id_fkey`;

-- DropIndex
DROP INDEX `users_magic_token_key` ON `users`;

-- DropIndex
DROP INDEX `users_refresh_token_key` ON `users`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `category`,
    DROP COLUMN `event_date`,
    ADD COLUMN `category_id` VARCHAR(36) NULL,
    ADD COLUMN `discoverable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `venue_country_id` VARCHAR(36) NULL,
    ADD COLUMN `venue_state_id` VARCHAR(36) NULL,
    MODIFY `host_permission_required` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `capacity` INTEGER NOT NULL DEFAULT -1;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `event_participation_enabled`,
    DROP COLUMN `instagram`,
    DROP COLUMN `magic_token`,
    DROP COLUMN `refresh_token`,
    DROP COLUMN `twitter`,
    DROP COLUMN `website`,
    ADD COLUMN `country_id` VARCHAR(36) NULL,
    ADD COLUMN `state_id` VARCHAR(36) NULL,
    MODIFY `full_name` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `cohosts`;

-- DropTable
DROP TABLE `updates`;

-- CreateTable
CREATE TABLE `chats` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `event_id` VARCHAR(36) NOT NULL,
    `content` VARCHAR(1000) NOT NULL,
    `is_notification` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hosts` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `event_id` VARCHAR(36) NOT NULL,
    `role` ENUM('1', '2', '3', '4') NOT NULL DEFAULT '3',
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hosts_user_id_event_id_key`(`user_id`, `event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_links` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `type` ENUM('PERSONAL_WEBSITE', 'INSTAGRAM', 'TWITTER') NOT NULL,
    `handle` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `social_links_userId_type_key`(`userId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `states` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(36) NOT NULL,
    `country_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `states_name_country_id_key`(`name`, `country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `provider` ENUM('MAGIC_LINK', 'GOOGLE') NOT NULL,
    `provider_user_id` VARCHAR(255) NULL,
    `magic_token` VARCHAR(100) NULL,
    `token_expiry` DATETIME(3) NULL,
    `refresh_token` VARCHAR(512) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_used_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `auth_magic_token_key`(`magic_token`),
    UNIQUE INDEX `auth_refresh_token_key`(`refresh_token`),
    UNIQUE INDEX `auth_provider_user_id_key`(`provider`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_primary_email_key` ON `users`(`primary_email`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chats` ADD CONSTRAINT `chats_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chats` ADD CONSTRAINT `chats_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_venue_state_id_fkey` FOREIGN KEY (`venue_state_id`) REFERENCES `states`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_venue_country_id_fkey` FOREIGN KEY (`venue_country_id`) REFERENCES `countries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hosts` ADD CONSTRAINT `hosts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hosts` ADD CONSTRAINT `hosts_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_links` ADD CONSTRAINT `social_links_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `states` ADD CONSTRAINT `states_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `auth_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
