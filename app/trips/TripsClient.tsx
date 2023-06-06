'use client';

import { toast } from 'sonner';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/app/types';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';

type Props = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
  title: string;
  subtitle?: string;
  actionLabel: string;
};

export default function TripsClient({
  reservations,
  currentUser,
  title,
  subtitle,
  actionLabel,
}: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  /*  It takes an `id` parameter and sets the `deletingId` state to that `id`. It then sends a DELETE 
    request to the server to cancel the reservation with that `id`. If the request is successful, 
    it displays a success message using the `toast` function and refreshes the page using the `router.refresh()` 
    method. If there is an error, it displays an error message using the `toast` function. Finally, it sets the `deletingId`
    state back to an empty string. The `useCallback` hook is used to memoize the function and prevent
    unnecessary re-renders. The `router` dependency is added to the dependency array to ensure that the
    function is recreated only when the `router` object changes. */
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
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
      <Heading title={title} subtitle={subtitle} />
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel={actionLabel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
