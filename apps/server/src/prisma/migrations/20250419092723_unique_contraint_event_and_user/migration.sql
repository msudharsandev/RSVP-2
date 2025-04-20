/*
  Warnings:

  - A unique constraint covering the columns `[event_id,user_id]` on the table `attendees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `attendees_event_id_user_id_key` ON `attendees`(`event_id`, `user_id`);
