import { VenueType } from '@prisma/client';

export interface IEvent {
  creatorId: number;
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  eventDate: string;
  description: string;
  eventImageId: string;
  venueType: VenueType;
  venueAddress?: string;
  venueUrl?: string;
  hostPermissionRequired: boolean;
}

export interface IEventFilters {
  email: string;
  type: string;
  fromDate: Date;
  toDate: Date;
  search?: string;
}
