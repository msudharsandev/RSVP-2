import Image from 'next/image';
import { userAvatarOptions } from '@/utils/constants';

export default function AvatarGroup() {
  return (
    <div className="flex -space-x-1">
      {userAvatarOptions.map((avatar) => (
        <Image
          key={avatar.id}
          className="rounded-full ring-2 ring-white"
          src={avatar.src}
          width={24}
          height={24}
          alt={`Avatar ${avatar.id}`}
        />
      ))}
      <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-dark-800 ring-2 ring-white">
        +5
      </span>
    </div>
  );
}
