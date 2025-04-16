import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AttendeeStatus } from '@/types/attendee';
import { IEvent } from '@/types/event';
import { userAvatarOptions } from '@/utils/constants';
export const venueDisplay = (event: IEvent | null) => {
  switch (event?.venueType) {
    case 'physical':
      return trimText(event?.venueAddress || '');
    case 'virtual':
      return trimText(event?.venueUrl || '');
    case 'later':
      return 'You will be notified once host updates the details';
    default:
      return '';
  }
};

const trimText = (venue: string) => {
  return venue.length > 40 ? (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger className="text-left">{venue.substring(0, 40) + '...'}</TooltipTrigger>
        <TooltipContent>{venue}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    venue
  );
};

export const getBadgeVariant = (status: AttendeeStatus) => {
  switch (status) {
    case AttendeeStatus.Going:
      return 'success';
    case AttendeeStatus.NotGoing:
      return 'destructive';
    case AttendeeStatus.Pending:
      return 'secondary';
    default:
      return 'default';
  }
};

export const getProfilePictureUrl = (profileIConId: number | string) => {
  const profileUrl = userAvatarOptions.find((option) => option.id === profileIConId);
  return profileUrl?.src ?? userAvatarOptions[0].src;
};
