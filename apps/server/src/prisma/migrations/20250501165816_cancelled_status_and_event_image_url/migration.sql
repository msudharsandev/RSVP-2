-- AlterTable
ALTER TABLE `attendees` MODIFY `status` ENUM('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '3';

-- AlterTable
ALTER TABLE `events` MODIFY `event_image_url` VARCHAR(256) NULL;
