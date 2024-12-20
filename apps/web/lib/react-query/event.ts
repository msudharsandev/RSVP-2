import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { CreateEventSubmissionType } from '../zod/event';
import { eventAPI } from '../axios/event-API';

interface ErrorResponse {
  message?: string;
}

export const useCreateEvent = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, CreateEventSubmissionType>({
    mutationFn: eventAPI.createEvent,
    onSuccess: () => {
      toast.success('Event created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
};
