-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primary_email` VARCHAR(256) NOT NULL,
    `secondary_email` VARCHAR(256) NULL,
    `full_name` VARCHAR(256) NOT NULL,
    `magicToken` VARCHAR(256) NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,
    `location` VARCHAR(256) NULL,
    `bio` VARCHAR(512) NULL,
    `twitter` VARCHAR(256) NULL,
    `instagram` VARCHAR(256) NULL,
    `website` VARCHAR(256) NULL,
    `profile_icon` VARCHAR(256) NULL,
    `event_participation_enabled` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_primary_email_key`(`primary_email`),
    UNIQUE INDEX `users_magicToken_key`(`magicToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `updates` (
    `id` VARCHAR(36) NOT NULL,
    `event_id` VARCHAR(36) NOT NULL,
    `content` VARCHAR(512) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `is_notification` BOOLEAN NOT NULL,
    `scheduled_notification_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(36) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `category` VARCHAR(256) NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `event_date` DATETIME(3) NOT NULL,
    `description` VARCHAR(512) NULL,
    `event_image_id` VARCHAR(256) NULL,
    `venue_type` VARCHAR(256) NOT NULL,
    `venue_address` VARCHAR(256) NULL,
    `venue_url` VARCHAR(256) NULL,
    `host_permission_required` BOOLEAN NOT NULL,
    `capacity` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendees` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `event_id` VARCHAR(36) NOT NULL,
    `registration_time` DATETIME(3) NOT NULL,
    `has_attended` BOOLEAN NOT NULL,
    `check_in_time` DATETIME(3) NULL,
    `feedback` VARCHAR(512) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `updates` ADD CONSTRAINT `updates_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
