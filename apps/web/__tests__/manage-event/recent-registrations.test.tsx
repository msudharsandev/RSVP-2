import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import RecentRegistrations from '@/components/manage-event/recent-registrations';
import { AttendeeStatus } from '@/types/attendee';
import { TEST_ATTENDEES_RECENT_REG } from '@/utils/test-constants';

const mockSetQueryParam = vi.fn();
vi.mock('@/hooks/useSearchParams.tsx', () => ({
  __esModule: true,
  default: () => ({
    set: mockSetQueryParam,
  }),
}));

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'test-event-id' }),
}));

const mockUseGetAttendeeByEventId = vi.fn();
vi.mock('@/lib/react-query/event', () => ({
  useGetAttendeeByEventId: (args: any) => mockUseGetAttendeeByEventId(args),
}));

describe('RecentRegistrations Component (Integration with DataTable)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetAttendeeByEventId.mockReturnValue({
      data: undefined,
      isLoading: true,
    });
  });

  it('should call API and handle loading state', () => {
    render(<RecentRegistrations />);
    expect(mockUseGetAttendeeByEventId).toHaveBeenCalledWith({
      eventId: 'test-event-id',
      status: [AttendeeStatus.Going, AttendeeStatus.Waiting],
      limit: 3,
      sortBy: 'registrationTime',
    });
  });

  it('should render title, button, and table content correctly when data loads', () => {
    mockUseGetAttendeeByEventId.mockReturnValue({
      data: { attendees: TEST_ATTENDEES_RECENT_REG, total: TEST_ATTENDEES_RECENT_REG.length },
      isLoading: false,
    });
    render(<RecentRegistrations />);

    expect(screen.getByText('Recent Registrations')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View all/i })).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(within(table).getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: /status/i })).toBeInTheDocument();

    TEST_ATTENDEES_RECENT_REG.forEach((attendee) => {
      expect(within(table).getByText(attendee.user.fullName as string)).toBeInTheDocument();
      expect(within(table).getByText(attendee.status)).toBeInTheDocument();
    });
  });

  it('should render title, button, and empty state correctly when no registrations exist', () => {
    mockUseGetAttendeeByEventId.mockReturnValue({
      data: { attendees: [], total: 0 },
      isLoading: false,
    });
    render(<RecentRegistrations />);

    expect(screen.getByText('Recent Registrations')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View all/i })).toBeInTheDocument();
    expect(screen.getByText('No registrations yet')).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(
      within(table).queryByText(TEST_ATTENDEES_RECENT_REG[0].user.fullName as string)
    ).not.toBeInTheDocument();
  });

  it('should update query params when "View all" button is clicked', () => {
    mockUseGetAttendeeByEventId.mockReturnValue({
      data: { attendees: TEST_ATTENDEES_RECENT_REG, total: TEST_ATTENDEES_RECENT_REG.length },
      isLoading: false,
    });
    render(<RecentRegistrations />);
    const viewAllButton = screen.getByRole('button', { name: /View all/i });
    fireEvent.click(viewAllButton);
    expect(mockSetQueryParam).toHaveBeenCalledWith('tab', 'guests');
  });
});
