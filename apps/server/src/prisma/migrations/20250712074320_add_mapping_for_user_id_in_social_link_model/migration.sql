/*
  Warnings:

  - You are about to drop the column `userId` on the `social_links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,type]` on the table `social_links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `social_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `social_links` DROP FOREIGN KEY `social_links_userId_fkey`;

-- DropIndex
DROP INDEX `social_links_userId_type_key` ON `social_links`;

-- AlterTable
ALTER TABLE `social_links` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `social_links_user_id_type_key` ON `social_links`(`user_id`, `type`);

-- AddForeignKey
ALTER TABLE `social_links` ADD CONSTRAINT `social_links_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
