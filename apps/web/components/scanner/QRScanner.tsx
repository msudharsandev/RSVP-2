'use client';

import { IAttendee } from '@/types/attendee';
import QrScanner from 'qr-scanner';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan: (data: IAttendee) => void;
}

const dummyAttendee = {
  name: 'Chandresh Patidar',
  imageUrl: 'https://github.com/shadcn.png',
  event: 'Comic Con,24 July 2024',
  qrToken: 'X7F-2K3',
  isCheckedIn: false,
};

const QRScanner = ({ onScan }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(dummyAttendee);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner
      .start()
      .then()
      .catch((err) => {
        toast.error(err, {
          description:
            'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.',
        });
      });

    return () => {
      qrScanner.destroy();
    };
  }, [onScan]);

  return (
    <video
      muted
      ref={videoRef}
      className="h-[398px] w-full rounded-xl border border-primary object-cover sm:max-w-[30rem]"
      aria-label="QR code scanner view"
    />
  );
};

export default QRScanner;
