-- DropForeignKey
ALTER TABLE `attendees` DROP FOREIGN KEY `attendees_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `attendees` DROP FOREIGN KEY `attendees_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `cohosts` DROP FOREIGN KEY `cohosts_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `cohosts` DROP FOREIGN KEY `cohosts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_creator_id_fkey`;

-- DropForeignKey
ALTER TABLE `updates` DROP FOREIGN KEY `updates_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `updates` DROP FOREIGN KEY `updates_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `updates` ADD CONSTRAINT `updates_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `updates` ADD CONSTRAINT `updates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendees` ADD CONSTRAINT `attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cohosts` ADD CONSTRAINT `cohosts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cohosts` ADD CONSTRAINT `cohosts_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
