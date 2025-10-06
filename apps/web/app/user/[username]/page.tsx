'use client';

import React, { ReactElement, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/common/Icon';
import Container from '@/components/common/Container';
import { useUserDetailsByUsername } from '@/lib/react-query/user';
import { useCurrentUser } from '@/lib/react-query/auth';
import { userAvatarOptions } from '@/utils/constants';
import { SocialPlatform } from '@/types/user';
import { getIcon, getSocialLink } from '@/utils/user';

const Page = () => {
  const params = useParams();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;
  const { data: userDetails } = useUserDetailsByUsername(username || '');
  const { data: currentUser } = useCurrentUser();

  // Determine if the current user is viewing their own profile
  const isOwnProfile = currentUser?.userName === username;

  const profilePictureUrl = useMemo(() => {
    const profileUrl = userAvatarOptions.find(
      (option) => option.id === userDetails?.data?.data.profileIcon
    );
    return profileUrl?.src ?? userAvatarOptions[0]?.src;
  }, [userDetails?.data?.data.profileIcon]);

  const date_string = userDetails?.data?.data.created_at;
  const date_object = dayjs(date_string);
  const formatted_date = date_object.format('dddd, MMMM DD');

  // Use different styling based on authentication status
  const isAuthenticated = !!currentUser;
  const titleClass = isAuthenticated ? 'text-2xl font-bold text-white' : 'text-2xl font-bold';
  const dateClass = isAuthenticated
    ? 'text-base font-semibold text-white'
    : 'text-base font-semibold';
  const locationClass = isAuthenticated
    ? 'text-base font-semibold text-white'
    : 'text-base font-semibold';

  return (
    <Container className="container-main py-16">
      <section className="mx-auto my-1 w-full max-w-[31rem]">
        <Card className="border-none bg-transparent">
          <CardContent>
            <div
              className={`flex items-end gap-4 ${isAuthenticated ? 'flex-wrap' : 'sm:flex-col lg:flex-row'}`}
            >
              <div className={`relative ${isAuthenticated ? 'size-28 shrink-0' : 'h-32 w-32'}`}>
                <Image
                  src={profilePictureUrl}
                  alt={'user-image'}
                  fill
                  className={`rounded-full object-cover ${isAuthenticated ? 'border-primary border-2' : ''}`}
                />
              </div>
              <div className={`flex items-center justify-start gap-${isAuthenticated ? '6' : '4'}`}>
                {isAuthenticated && userDetails?.data?.data.socialLinks ? (
                  // Use the new social links format for authenticated users
                  userDetails.data.data.socialLinks.map(
                    ({ handle, type }: { handle: string; type: SocialPlatform }) => (
                      <Link
                        href={getSocialLink(type, handle)}
                        target="_blank"
                        key={`${type}-${handle}`}
                      >
                        {getIcon(type)}
                      </Link>
                    )
                  )
                ) : (
                  // Fallback to old format for guest users or when socialLinks is not available
                  <>
                    {userDetails?.data?.data.instagram && (
                      <Link
                        href={`https://instagram.com/${userDetails?.data?.data.instagram}`}
                        target="_blank"
                      >
                        <Icons.instagram className="cursor-pointer" />
                      </Link>
                    )}

                    {userDetails?.data?.data.twitter && (
                      <Link
                        href={`https://x.com/${userDetails?.data?.data.twitter}`}
                        target="_blank"
                      >
                        <Icons.twitter className="cursor-pointer" />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className={`mt-${isAuthenticated ? '5' : '4'} space-y-3`}>
              <h3 className={titleClass}>
                {isAuthenticated
                  ? userDetails?.data?.data.fullName || userDetails?.data?.data.username
                  : userDetails?.data?.data.userName}
              </h3>
              {userDetails?.data?.data.bio && (
                <p className="text-base text-secondary">{userDetails?.data?.data.bio}</p>
              )}
            </div>
            <section
              className={`mt-${isAuthenticated ? '5' : '4'} space-y-${isAuthenticated ? '6' : '3'}`}
            >
              {formatted_date && (
                <div
                  className={`flex items-center ${isAuthenticated ? 'gap-5' : 'justify-start gap-4 space-y-4'}`}
                >
                  <Icons.calendar className={isAuthenticated ? 'shrink-0' : ''} />
                  <span>
                    <p className="text-sm text-secondary">Joined on</p>
                    <p className={dateClass}>{formatted_date}</p>
                  </span>
                </div>
              )}
              {userDetails?.data?.data?.location && (
                <div
                  className={`flex items-center ${isAuthenticated ? 'gap-5' : 'justify-start gap-4 space-y-4'}`}
                >
                  <Icons.location className={isAuthenticated ? 'shrink-0' : ''} />
                  <span>
                    <p className="text-sm text-secondary">Location</p>
                    <p className={locationClass}>{userDetails?.data?.data.location}</p>
                  </span>
                </div>
              )}
            </section>
          </CardContent>
        </Card>
      </section>
    </Container>
  );
};

export default Page;
