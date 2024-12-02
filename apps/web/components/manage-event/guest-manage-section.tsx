import EventDetailsTable from './EventDetailsTable';
import { EventHeroSection } from './EventHeroSection';

const GuestManageSection = () => {
  return (
    <section className="space-y-6">
      <EventHeroSection />
      <EventDetailsTable />
    </section>
  );
};

export default GuestManageSection;
