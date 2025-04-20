import { IPaginationParams } from './pagination';

/**
 * Interface for filtering and paginating registered events for a user.
 */
export interface IRegisteredEvent {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface IAttendeesByEvent extends IPaginationParams {
  eventId: string;
  hasAttended?: boolean;
  status?: string[];
}
