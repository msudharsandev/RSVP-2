import { IUser } from '@/types/user';

export const PHONE_NUMBER_LABEL = /phone number/i;
export const SAVE_BUTTON_LABEL = /save/i;
export const RESET_BUTTON_LABEL = /reset/i;

export const TEST_COMPONENT = {
  PHONE_NUMBER_FORM: 'PhoneNumberForm',
};

export const invalidPhoneNumberFormats = [
  { input: '987654321', error: 'Phone number must be 10 digits' },
  { input: '98765432101', error: 'Phone number must be 10 digits' },
  { input: '98 76543210', error: 'Only numbers are allowed' },
  { input: '+919876543210', error: 'Only numbers are allowed' },
  { input: 'abcdefghij', error: 'Only numbers are allowed' },
];

export const baseUser: IUser = {
  id: 1,
  primary_email: 'test@example.com',
  contact: '1234567890',
  event_participation_enabled: true,
  created_at: new Date(),
  updated_at: new Date(),
};
