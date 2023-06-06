import EmptyState from '@/app/components/EmptyState';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import TripsClient from './TripsClient';

export default async function Tripspage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
      title="Trips"
      subtitle="Where you've been and where you're going"
      actionLabel="Cancel reservation"
    />
  );
}
