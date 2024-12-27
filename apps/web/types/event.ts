export interface IEvent {
  id: string;
  creatorId: number;
  name: string;
  slug: string;
  category: string;
  startTime: Date;
  endTime: Date;
  eventDate: Date;
  description: string;
  eventImageId: string;
  venueType: VenueType;
  venueAddress?: string;
  venueUrl?: string;
  hostPermissionRequired: boolean;
  capacity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type VenueType = 'physical' | 'virtual';
