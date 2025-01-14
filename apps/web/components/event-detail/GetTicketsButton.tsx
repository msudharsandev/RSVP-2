'use client';

import { Button } from '../ui/button';
import {
  useCreateAttendee,
  useGetAttendeeDetails,
  useSoftDeleteAttendee,
} from '@/lib/react-query/event';
import SigninDialog from '../auth/SigninDialog';
import { useCurrentUser } from '@/lib/react-query/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type GetTicketsButtonProps = {
  eventId: string;
};

const GetTicketsButton = ({ eventId }: GetTicketsButtonProps) => {
  const { data: userData, isLoading: userDataLoading } = useCurrentUser();
  const { mutate, isSuccess } = useCreateAttendee();
  const { mutate: getAttendeeData, isSuccess: attendeeDataSuccess } = useGetAttendeeDetails();
  const {
    mutate: cancelRegistration,
    isSuccess: cancelRegistrationSuccess,
    reset: resetCancelRegistration,
  } = useSoftDeleteAttendee();
  const [loading, setLoading] = useState(true);

  const handleGetTickets = async () => {
    resetCancelRegistration();
    mutate(eventId);
  };

  const handleCancelRegistration = () => {
    cancelRegistration(eventId);
  };

  useEffect(() => {
    if (!userData || !userData.data?.data?.id) return;
    getAttendeeData(
      { eventId, userId: userData.data.data.id },
      {
        onSettled: () => setLoading(false),
      }
    );
  }, [eventId, userData]);

  if (loading && userDataLoading) {
    return (
      <Button variant="subtle" className="mt-4 w-full rounded-full px-4 py-2" disabled>
        Loading...
      </Button>
    );
  }

  if ((isSuccess || attendeeDataSuccess) && !cancelRegistrationSuccess) {
    return (
      <div className="flex w-full flex-col gap-4">
        <Button variant="subtle" className="mt-4 w-full rounded-full px-4 py-2">
          <Link href={`/ticket/${eventId}`}>Show Tickets</Link>
        </Button>
        <Button
          variant="destructive"
          className="w-full rounded-full px-4 py-2"
          onClick={handleCancelRegistration}
        >
          Cancel Registration
        </Button>
      </div>
    );
  }

  if (!userData?.data?.data) {
    return (
      <SigninDialog variant="signin">
        <Button className="mt-4 w-full rounded-full px-4 py-2">Get Tickets</Button>
      </SigninDialog>
    );
  }

  return (
    <Button className="mt-4 w-full rounded-full px-4 py-2" onClick={handleGetTickets}>
      Get Tickets
    </Button>
  );
};

export default GetTicketsButton;
