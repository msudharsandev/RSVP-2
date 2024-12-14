export interface IUpdate {
  id?: string;
  eventId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  isNotification: boolean;
  scheduledNotificationTime?: Date | null;
}
