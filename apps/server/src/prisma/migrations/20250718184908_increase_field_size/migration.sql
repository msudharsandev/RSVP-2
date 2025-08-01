-- AlterTable
ALTER TABLE `attendees` MODIFY `feedback` VARCHAR(256) NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `countries` MODIFY `name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `events` MODIFY `name` VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE `states` MODIFY `name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `user_name` VARCHAR(100) NULL,
    MODIFY `location` VARCHAR(256) NULL;
