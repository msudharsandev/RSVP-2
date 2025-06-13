import Container from '@/components/common/Container';
import EventDetail from '@/components/event-detail/EventDetail';
import { eventAPI } from '@/lib/axios/event-API';
import { AxiosError } from 'axios';
import { notFound } from 'next/navigation';

const EventDetailPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  try {
    const eventData = await eventAPI.getEventBySlug(slug);
    if (!eventData) notFound();

    const serializedEvent = JSON.parse(JSON.stringify(eventData));

    return (
      <Container className="container-main pt-8">
        <EventDetail eventData={serializedEvent} />
      </Container>
    );
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.status === 404) {
      notFound();
    }
    return (
      <Container className="container-main pt-8">
        <h1 className="text-red-500">Error loading event details. Please try again later.</h1>
      </Container>
    );
  }
};

export default EventDetailPage;
