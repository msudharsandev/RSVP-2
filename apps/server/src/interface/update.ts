/**
 * Interface representing an update or notification related to an event.
 */
export interface IUpdate {
  id?: string;
  userId: string;
  eventId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  isNotification: boolean;
  scheduledNotificationTime?: Date | null;
}
