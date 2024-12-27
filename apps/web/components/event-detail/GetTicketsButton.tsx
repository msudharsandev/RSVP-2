'use client';

import { Button } from '../ui/button';
import { useCreateAttendee } from '@/lib/react-query/event';
import SigninDialog from '../auth/SigninDialog';
import { useCurrentUser } from '@/lib/react-query/auth';

type GetTicketsButtonProps = {
  eventId: string;
};

const GetTicketsButton = ({ eventId }: GetTicketsButtonProps) => {
  const { data: userData } = useCurrentUser();
  const { mutate, isSuccess } = useCreateAttendee();

  const handleGetTickets = async () => {
    mutate(eventId);
  };

  if (isSuccess) {
    return (
      <Button variant="subtle" className="mt-4 w-full rounded-full px-4 py-2">
        Show Tickets
      </Button>
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
