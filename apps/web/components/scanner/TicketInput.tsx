'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { IAttendee } from '@/types/attendee';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const dummyAttendee = {
  name: 'Chandresh Patidar',
  imageUrl: 'https://github.com/shadcn.png',
  event: 'Comic Con,24 July 2024',
  qrToken: 'X7F-2K3',
  isCheckedIn: false,
};
type TicketInputProps = {
  onSubmit: (data: IAttendee) => void;
};

const FormSchema = z.object({
  ticketNumber: z.string().length(6),
});

const TicketInput = ({ onSubmit }: TicketInputProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ticketNumber: '',
    },
  });

  function handleSubmit(data: { ticketNumber: string }) {
    onSubmit(dummyAttendee);
    form.reset({ ticketNumber: '' });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="ticketNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Code Here</FormLabel>
              <FormControl>
                <InputOTP
                  containerClassName="gap-3.5 sm:gap-5 flex-wrap"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  {[...Array(6)].map((_, index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot
                        index={index}
                        className="h-[50px] w-[50px] bg-dark-900 text-2xl font-bold ring-primary sm:h-[60px] sm:w-[60px]"
                      />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-5 w-full rounded-md py-3.5 font-semibold"
          disabled={!form.formState.isValid}
          type="submit"
        >
          Search Attendee
        </Button>
      </form>
    </Form>
  );
};

export default TicketInput;
