import React from 'react';
import SemiCircleBar from '../ui/SemiCircleBar';
import { Icons } from '../common/Icon';
import { Card, CardHeader } from '../ui/card';

export const EventHeroSection = () => {
  return (
    <div className="mb-10 mt-8 w-full space-y-6">
      <h2 className="text-xl font-bold">At a Glance</h2>
      <div className="space-y-6 sm:flex sm:space-x-6 sm:space-y-0">
        <Card className="h-56 w-full overflow-hidden border sm:w-[380px]">
          <CardHeader className="flex flex-col bg-dark-800 p-2">
            <h3 className="pl-3 pt-3 font-bold">Guest Booked</h3>
            <p className="pl-3 pt-3 text-sm text-gray-400">Your 80% of seats have been booked.</p>
          </CardHeader>
          <div className="flex items-center justify-center">
            <SemiCircleBar />
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex h-[96px] w-full items-center rounded-lg bg-green-900 p-4 sm:w-[450px]">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg bg-white">
              <Icons.qrcode className="text-xl" />
            </div>
            <div className="ml-5">
              <h3 className="font-bold text-white">Check In Guest</h3>
              <p className="text-sm text-gray-200">Your 80% of seats have been booked.</p>
            </div>
          </div>

          <div className="flex h-[96px] w-full items-center rounded-lg bg-dark-500 p-4 sm:w-[450px]">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg bg-white">
              <Icons.download className="text-xl" />
            </div>
            <div className="ml-5">
              <h3 className="font-bold text-white">Download Excel</h3>
              <p className="text-sm text-gray-200">Download data of your guest in xlsx.</p>
            </div>
          </div>

          <div className="flex h-[96px] w-full items-center rounded-lg bg-blue p-4 sm:w-[450px]">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg bg-white">
              <Icons.mail className="text-xl" />
            </div>
            <div className="ml-5">
              <h3 className="font-bold text-white">Invite Your Guest</h3>
              <p className="text-sm text-gray-200">Your 80% of seats have been booked.</p>
            </div>
          </div>

          <div className="flex h-[96px] w-full items-center rounded-lg bg-orange p-4 sm:w-[450px]">
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-lg bg-white">
              <Icons.guest className="text-xl" />
            </div>
            <div className="ml-5">
              <h3 className="font-bold text-white">Guest List</h3>
              <p className="text-sm text-gray-200">Shown to guest.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
