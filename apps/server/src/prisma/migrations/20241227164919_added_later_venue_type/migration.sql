-- AlterTable
ALTER TABLE `events` MODIFY `venue_type` ENUM('physical', 'virtual', 'later') NOT NULL;
