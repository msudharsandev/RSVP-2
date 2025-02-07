import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { CreateEventSubmissionType } from '../zod/event';
import { eventAPI, UpdateEventSubmissionType } from '../axios/event-API';
import { useRouter } from 'next/navigation';
import { IEvent } from '@/types/event';

interface ErrorResponse {
  message?: string;
}

export const useGetEvent = () => {
  return useQuery({
    queryKey: ['event'],
    queryFn: () => eventAPI.getEvent(),
  });
};

export const useCreateEvent = () => {
  const router = useRouter();
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, CreateEventSubmissionType>({
    mutationFn: eventAPI.createEvent,
    onSuccess: ({ data }) => {
      toast.success('Event created successfully');
      console.log(data);
      const url = `/${data.event.slug}`;
      // console.log(url);
      router.push(url);
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, UpdateEventSubmissionType>({
    mutationFn: eventAPI.updateEvent,
    onSuccess: () => {
      toast.success('Event updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
};

export const useCreateAttendee = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, string>({
    mutationFn: eventAPI.createAttendee,
    onSuccess: () => {
      toast.success('Attendee created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
};

export const useSoftDeleteAttendee = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, string>({
    mutationFn: eventAPI.softDeleteAttendee,
    onSuccess: () => {
      toast.success('Registration cancelled successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Failed to cancel registration');
    },
  });
};

export const useGetEventById = (id: string) => {
  return useQuery<IEvent, AxiosError<ErrorResponse>>({
    queryKey: ['event', 'id', id],
    queryFn: async () => {
      const response = await eventAPI.getEventById(id);
      return response.data.event;
    },
  });
};

export const useGetEventDetails = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, string>({
    mutationFn: eventAPI.getEventById,
  });
};

export const useGetAttendeeDetails = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, { eventId: string; userId: string }>(
    {
      mutationFn: eventAPI.getAttendee,
    }
  );
};

export const useCancelEvent = () => {
  return useMutation<AxiosResponse, AxiosError<ErrorResponse>, { eventId: string }>({
    mutationFn: ({ eventId }) => eventAPI.cancelEvent(eventId),
    onSuccess: () => {
      toast.success('Event cancelled successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Failed to cancel event');
    },
  });
};
