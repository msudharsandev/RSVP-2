import { cn } from '@/lib/utils';
import { IEventCard } from '@/types/event.ts';
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const EventCard = ({ className, event }: IEventCard) => {
  return (
    <article
      className={cn('space-y-2.5 rounded-[10px] border border-dark-500 bg-dark-900 p-3', className)}
    >
      <figure>
        <Image
          priority
          src="/images/demo-event-image.png"
          width={300}
          height={200}
          className="h-44 w-full rounded-[8px] object-cover"
          alt={'demo-event-image'}
        />
      </figure>
      <p className="flex flex-col">
        <span className="text-xl font-bold">{event?.name}</span>
        <span className="mb-3 font-semibold">{event?.host}</span>
        <span className="font-bold">
          {event?.startTime ? dayjs(event.startTime).format('HH:mm A, DD MMM YYYY') : ''}
        </span>
        <span className="font-medium">{event?.venueAddress?.substring(0, 35)}</span>
      </p>
      <section className="flex items-center text-sm">
        <div className="flex items-center">
          <CheckCircleIcon className="mr-2 w-[18px]" />
          <span>{event?.numberOfAttendees} going</span>
        </div>
      </section>
      <Link href={`/events/${event?.id}/manage`} passHref className="block">
        <Button variant="tertiary" radius="default" className="w-full border-primary">
          Manage <ArrowUpRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </Link>
      <Link href={`/${event?.slug}`} passHref className="block">
        <Button variant="tertiary" radius="default" className="w-full border-primary">
          Public View <ArrowUpRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </article>
  );
};

export default EventCard;
