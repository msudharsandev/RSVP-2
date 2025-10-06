"use-client"
import {useRouter} from 'next/navigation'

export const handlePostAuthRedirect = (isCompleted: boolean) => {
    const router = useRouter();
    const redirectUrl = window.localStorage.getItem('redirect');
    const eventFormData = window.localStorage.getItem('eventFormData');
    if (eventFormData) {
      router.push('/create-event');
    } else {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (isCompleted) {
        router.push('/events');
      } else {
        router.push('/profile');
      }
    }
  };
  