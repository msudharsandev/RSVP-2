'use client';

import {
  useCreateEvent,
  useGetEventById,
  useGetEventDetails,
  useUpdateEvent,
} from '@/lib/react-query/event';
import { fileFromUrl } from '@/lib/utils';
import { CreateEventFormType, CreateEventSubmissionType } from '@/lib/zod/event';
import { combineDateAndTime } from '@/utils/time';
import axios from 'axios';
import { Separator } from '../ui/separator';
import EventForm from './EventForm';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { UpdateEventSubmissionType } from '@/lib/axios/event-API';

const allowedDate = new Date();
allowedDate.setHours(0, 0, 0, 0);
allowedDate.setDate(allowedDate.getDate() + 1);

const EditEventForm = () => {
  const eventId = useParams().id as string;
  const { data, isLoading } = useGetEventById(eventId);
  const { mutate, isPending } = useUpdateEvent();

  async function onSubmit(data: CreateEventFormType) {
    const {
      name,
      category,
      description,
      eventImageId,
      venueType,
      hostPermissionRequired,
      capacity,
      location,
      fromTime,
      fromDate,
      toTime,
      toDate,
    } = data;

    const submissionData: UpdateEventSubmissionType = {
      id: eventId,
      name,
      category,
      description,
      eventImageId: eventImageId.url ?? '',
      venueType,
      venueAddress: venueType === 'physical' ? location : undefined,
      venueUrl: venueType === 'virtual' ? location : undefined,
      hostPermissionRequired,
      capacity,
      startTime: combineDateAndTime(fromDate, fromTime),
      endTime: combineDateAndTime(toDate, toTime),
      eventDate: fromDate,
    };

    // Upload image if it's a new image
    if (eventImageId.file && eventImageId.signedUrl) {
      const imageFile = await fileFromUrl(eventImageId.file, 'event-image');
      try {
        await axios.put(eventImageId.signedUrl, imageFile);
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }

    // If the image is not changed, we don't need to upload it again
    else if (eventImageId.file) {
      submissionData.eventImageId = eventImageId.file;
    }
    mutate(submissionData);
  }

  const defaultValues: CreateEventFormType = {
    name: data?.name ?? '',
    category: data?.category ?? '',
    description: data?.description ?? '',
    venueType: data?.venueType ?? 'physical',
    location: data?.venueAddress ?? '',
    hostPermissionRequired: data?.hostPermissionRequired ?? false,
    fromTime: dayjs(data?.startTime).format('HH:mm'),
    fromDate: data?.eventDate ?? allowedDate,
    toTime: dayjs(data?.endTime).format('HH:mm'),
    toDate: data?.endTime ?? allowedDate,
    capacity: data?.capacity ?? 0,
    eventImageId: {
      signedUrl: '',
      file: data?.eventImageId ?? '',
      url: '',
    },
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="font-medium text-secondary">Fill in the form below to create a new event</p>
      </div>
      <Separator className="my-9 bg-separator" />
      <EventForm defaultValues={defaultValues} isLoading={isPending} onSubmit={onSubmit} />
    </>
  );
};

export default EditEventForm;
