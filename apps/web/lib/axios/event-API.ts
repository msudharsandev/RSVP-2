import { IEvent } from '@/types/event';
import { CreateEventSubmissionType } from '../zod/event';
import api from './instance';

export const eventAPI = {
  createEvent: async (payload: CreateEventSubmissionType) => {
    return api.post('/event', payload);
  },

  getEventBySlug: async (slug: string): Promise<IEvent> => {
    const response = await api.get(`/event/slug/${slug}`);
    return response.data;
  },

  createAttendee: async (eventId: string) => {
    return api.post(`event/${eventId}/attendees`);
  },
};
