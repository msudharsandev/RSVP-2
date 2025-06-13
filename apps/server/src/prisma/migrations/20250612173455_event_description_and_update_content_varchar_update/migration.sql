/*
  Warnings:

  - You are about to alter the column `description` on the `events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(310)`.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `description` VARCHAR(310) NULL;

-- AlterTable
ALTER TABLE `updates` MODIFY `content` VARCHAR(310) NOT NULL;
