import { cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithQueryClient } from './utils/tanstack-query';
import ProfileForm from '@/components/profile/ProfileForm';
import { useProfileUpdate } from '@/lib/react-query/user';

vi.mock('next/image', () => ({
  default: (props: any) => <img alt="" {...props} />,
}));

vi.mock('@/lib/react-query/user', () => ({
  useProfileUpdate: () => ({
    mutate: vi.fn((data, options) => {
      if (options?.onSuccess) options.onSuccess();
    }),
  }),
}));

const mockUser = {
  id: '1',
  primaryEmail: 'john@example.com',
  secondaryEmail: 'john1@example.com',
  contact: '+919876543210',
  fullName: 'John Doe',
  magicToken: 'magictoken123',
  isCompleted: true,
  location: 'Delhi',
  bio: 'John Doe bio',
  twitter: 'john123',
  instagram: 'john789',
  website: 'https://johndoe.com',
  profileIcon: 1,
  eventParticipationEnabled: true,
  createdAt: new Date('2025-03-07'),
  updatedAt: new Date('2024-03-13'),
  isDeleted: false,
  isProfileComplete: true, 
  initials: 'TU',
  profileIconUrl: 'https://example.com/icon.png', 
};

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('ProfileForm component', () => {
  it('should test editing fields and form data correctly', async () => {
    renderWithQueryClient(<ProfileForm user={mockUser} />);

    const nameInput = screen.getByDisplayValue(mockUser.fullName);
    const locationInput = screen.getByDisplayValue(mockUser.location);
    const bioInput = screen.getByDisplayValue(mockUser.bio);
    const twitterInput = screen.getByDisplayValue(mockUser.twitter);
    const instagramInput = screen.getByDisplayValue(mockUser.instagram);
    const websiteInput = screen.getByDisplayValue(mockUser.website);
    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;

    expect(saveButton.disabled).toBeTruthy();

    fireEvent.change(nameInput, { target: { value: 'John Smith' } });
    fireEvent.change(locationInput, { target: { value: 'Mumbai' } });
    fireEvent.change(bioInput, { target: { value: 'Updated bio' } });
    fireEvent.change(twitterInput, { target: { value: 'john_twt' } });
    fireEvent.change(instagramInput, { target: { value: 'john_insta' } });
    fireEvent.change(websiteInput, { target: { value: 'john.ai' } });

    expect(saveButton.disabled).toBeFalsy();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(saveButton.disabled).toBeFalsy();
    });
  });

  it('should validate input formats and character limits', async () => {
    renderWithQueryClient(<ProfileForm user={mockUser} />);

    const nameInput = screen.getByDisplayValue(mockUser.fullName);
    const locationInput = screen.getByDisplayValue(mockUser.location);
    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('String must contain at least 1 character(s)');
      expect(errorMessage).toBeDefined();
    });

    fireEvent.change(nameInput, { target: { value: '12345' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Cannot contain only numbers');
      expect(errorMessage).toBeDefined();
    });

    fireEvent.change(locationInput, { target: { value: '123' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Cannot contain only numbers');
      expect(errorMessage).toBeDefined();
    });
  });

  it('should ensure Save button activates only on changes', async () => {
    renderWithQueryClient(<ProfileForm user={mockUser} />);

    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;
    expect(saveButton.disabled).toBeTruthy();

    const nameInput = screen.getByDisplayValue(mockUser.fullName);
    fireEvent.change(nameInput, { target: { value: 'John Wick' } });

    expect(saveButton.disabled).toBeFalsy();
  });

  it('should ensure Reset button discards changes', async () => {
    renderWithQueryClient(<ProfileForm user={mockUser} />);

    const nameInput = screen.getByDisplayValue(mockUser.fullName) as HTMLInputElement;
    const resetButton = screen.getByRole('button', { name: 'Reset' }) as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'John Wick' } });
    expect(nameInput.value).toBe('John Wick');

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(nameInput.value).toBe(mockUser.fullName);
    });
  });

  it('should check persistence after page refresh', async () => {
    const newData = {
      fullName: 'John Smith',
      location: 'Bangalore',
      bio: 'This is a new bio',
      profile_icon: 'icon2',
      twitter: 'johnsmith',
      website: 'example.com',
      instagram: 'johnsmith_insta',
    };
    const { unmount } = renderWithQueryClient(<ProfileForm user={mockUser} />);

    const nameInput = await waitFor(() => screen.getByDisplayValue(mockUser.fullName));

    const locationInput = screen.getByDisplayValue(mockUser.location) as HTMLInputElement;
    const bioInput = screen.getByDisplayValue(mockUser.bio) as HTMLInputElement;
    const twitterInput = screen.getByDisplayValue(mockUser.twitter) as HTMLInputElement;
    const instagramInput = screen.getByDisplayValue(mockUser.instagram) as HTMLInputElement;
    const websiteInput = screen.getByDisplayValue(mockUser.website) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: newData.fullName } });
    fireEvent.change(locationInput, { target: { value: newData.location } });
    fireEvent.change(bioInput, { target: { value: newData.bio } });
    fireEvent.change(twitterInput, { target: { value: newData.twitter } });
    fireEvent.change(instagramInput, { target: { value: newData.instagram } });
    fireEvent.change(websiteInput, { target: { value: newData.website } });

    const saveButton = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;
    fireEvent.click(saveButton);

    unmount();

    const updatedMockUser = { ...mockUser, ...newData };
    renderWithQueryClient(<ProfileForm user={updatedMockUser} />);

    const updatedNameInput = screen.getByDisplayValue(newData.fullName) as HTMLInputElement;
    const updatedLocationInput = screen.getByDisplayValue(newData.location) as HTMLInputElement;
    const updatedBioInput = screen.getByDisplayValue(newData.bio) as HTMLInputElement;
    const updatedTwitterInput = screen.getByDisplayValue(newData.twitter) as HTMLInputElement;
    const updatedInstagramInput = screen.getByDisplayValue(newData.instagram) as HTMLInputElement;
    const updatedWebsiteInput = screen.getByDisplayValue(newData.website) as HTMLInputElement;

    await waitFor(() => {
      expect(updatedNameInput.value).toBe(newData.fullName);
      expect(updatedLocationInput.value).toBe(newData.location);
      expect(updatedBioInput.value).toBe(newData.bio);
      expect(updatedTwitterInput.value).toBe(newData.twitter);
      expect(updatedInstagramInput.value).toBe(newData.instagram);
      expect(updatedWebsiteInput.value).toBe(newData.website);
    });
  });
});
