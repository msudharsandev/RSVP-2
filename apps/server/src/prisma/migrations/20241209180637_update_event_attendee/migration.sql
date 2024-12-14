-- AlterTable
ALTER TABLE `attendees` ADD COLUMN `allowedStatus` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
