import { CreateEventSubmissionType } from '../zod/event';
import api from './instance';

export const eventAPI = {
  createEvent: async (payload: CreateEventSubmissionType) => {
    return api.post('/event', payload);
  },
};
