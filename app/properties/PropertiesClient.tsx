'use client';

import { toast } from 'sonner';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeListing, SafeUser } from '@/app/types';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';

type Props = { listings: SafeListing[]; currentUser?: SafeUser | null };

export default function PropertiesClient({ listings, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  /* `onDelete` is a function that is created using the `useCallback` hook. It takes an `id` parameter
and sets the `deletingId` state to that `id`. It then sends a DELETE request to the server using
`axios` to delete the listing with that `id`. If the request is successful, it displays a success
message using the `toast` function and refreshes the page using `router.refresh()`. If there is an
error, it displays an error message using the `toast` function. Finally, it sets the `deletingId`
state back to an empty string. The `router` dependency is passed to `useCallback` so that the
function is only recreated if the `router` object changes. */
  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
      mt-10
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
    "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
