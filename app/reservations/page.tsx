import EmptyState from '@/app/components/EmptyState';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import TripsClient from '../trips/TripsClient';

type Props = {};

export default async function ReservationsPage({}: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
      title="Reservations"
      subtitle="Bookings on your properties"
      actionLabel="Cancel guest reservation"
    />
  );
}
