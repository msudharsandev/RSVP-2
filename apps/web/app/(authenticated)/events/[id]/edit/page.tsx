import Container from '@/components/common/Container';
import EditEventForm from '@/components/create-event/EditEventForm';

const EditEventPage = () => {
  return (
    <Container className="container-main py-8">
      <h2 className="text-2xl/[2.25rem] font-semibold text-white">Edit Event</h2>
      <EditEventForm />
    </Container>
  );
};

export default EditEventPage;
