import { Separator } from '@/components/ui/separator';
import CustomiseEventCard from './customise-event-card';
import EventHostManagment from './event-host-managment';
import RecentRegistrations from './recent-registrations';
import { useParams } from 'next/navigation';

const OverviewSection = () => {
  return (
    <section className="space-y-6">
      <CustomiseEventCard className="max-w-2xl" />
      <div className="py-4">
        <Separator />
      </div>
      <RecentRegistrations className="max-w-2xl" />
      <EventHostManagment className="max-w-2xl" />
    </section>
  );
};

export default OverviewSection;
