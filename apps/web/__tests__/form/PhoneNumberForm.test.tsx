import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { useProfileUpdate } from '@/lib/react-query/user';
import PhoneNumberForm from '@/components/profile/ContactForm';
import {
  PHONE_NUMBER_LABEL,
  SAVE_BUTTON_LABEL,
  RESET_BUTTON_LABEL,
  invalidPhoneNumberFormats,
  TEST_COMPONENT,
  baseUser,
} from '@/utils/test-constants';

vi.mock('@/lib/react-query/user', () => ({
  useProfileUpdate: vi.fn(),
}));

describe(TEST_COMPONENT.PHONE_NUMBER_FORM, () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    (useProfileUpdate as any).mockReturnValue({ mutate: mockMutate });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders with the default contact value', async () => {
    render(<PhoneNumberForm user={baseUser} />);

    const input = screen.getByRole('textbox', { name: PHONE_NUMBER_LABEL });
    expect(input).toHaveValue(baseUser.contact);
  });

  it('accepts a valid 10-digit phone number', async () => {
    render(<PhoneNumberForm user={baseUser} />);
    const user = userEvent.setup();

    const input = screen.getByRole('textbox', { name: PHONE_NUMBER_LABEL });
    await user.clear(input);
    await user.type(input, '9876543210');

    const saveButton = screen.getByRole('button', { name: SAVE_BUTTON_LABEL });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText(/only numbers are allowed/i)).toBeNull();
      expect(screen.queryByText(/phone number must be 10 digits/i)).toBeNull();
    });
  });

  it.each(invalidPhoneNumberFormats)(
    'shows validation error for invalid input "$input"',
    async ({ input, error }) => {
      render(<PhoneNumberForm user={baseUser} />);
      const user = userEvent.setup();

      const inputField = screen.getByRole('textbox', { name: PHONE_NUMBER_LABEL });
      await user.clear(inputField);
      await user.type(inputField, input);

      const saveButton = screen.getByRole('button', { name: SAVE_BUTTON_LABEL });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(new RegExp(error, 'i'))).toBeInTheDocument();
      });
    }
  );

  it('disables reset and save buttons initially and enables them when input is dirty', async () => {
    render(<PhoneNumberForm user={baseUser} />);
    const user = userEvent.setup();

    const resetButton = screen.getByRole('button', { name: RESET_BUTTON_LABEL });
    const saveButton = screen.getByRole('button', { name: SAVE_BUTTON_LABEL });
    const input = screen.getByRole('textbox', { name: PHONE_NUMBER_LABEL });

    expect(resetButton).toBeDisabled();
    expect(saveButton).toBeDisabled();

    await user.type(input, '9876543210');

    expect(resetButton).not.toBeDisabled();
    expect(saveButton).not.toBeDisabled();
  });

  it('resets the form when the reset button is clicked', async () => {
    render(<PhoneNumberForm user={baseUser} />);
    const user = userEvent.setup();

    const input = screen.getByRole('textbox', { name: PHONE_NUMBER_LABEL });
    const resetButton = screen.getByRole('button', { name: RESET_BUTTON_LABEL });

    await user.clear(input);
    await user.type(input, '9876543210');
    expect(input).toHaveValue('9876543210');

    await user.click(resetButton);

    expect(input).toHaveValue(baseUser.contact);
  });

  it('calls mutate on valid submission and resets form on success', async () => {
    render(<PhoneNumberForm user={baseUser} />);
    const user = userEvent.setup();

    const input = screen.getByRole('textbox', { name: PHONE_NUMBER_LABEL });
    const saveButton = screen.getByRole('button', { name: SAVE_BUTTON_LABEL });

    await user.clear(input);
    await user.type(input, '9876543210');
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { contact: '9876543210' },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });

    const firstCall = mockMutate.mock.calls[0];
    if (firstCall) {
      const onSuccess = (firstCall[1] as any).onSuccess!;
      onSuccess();

      expect(input).toHaveValue('9876543210');
    }
  });
});
