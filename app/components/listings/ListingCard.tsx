'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import Button from '../Button';
import HeartButton from '../HeartButton';

type Props = {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

export default function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}: Props) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  /* `handleCancel` is a callback function that is created using the `useCallback` hook. It takes a
`React.MouseEvent<HTMLButtonElement>` event as its argument and checks if the `disabled` prop is
true. If it is, the function returns without doing anything. If it is not, the `onAction` function
is called with the `actionId` prop as its argument. The `useCallback` hook is used to memoize the
function and prevent unnecessary re-renders. The dependencies array `[disabled, onAction, actionId]`
is passed as the second argument to `useCallback` to ensure that the function is only re-created if
any of these dependencies change. */
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  /* The `useMemo` hook is used to memoize the `price` value. It returns the `totalPrice` of the
`reservation` object if it exists, otherwise it returns the `price` value of the `data` object. The
dependencies array `[reservation, data.price]` is passed as the second argument to `useMemo` to
ensure that the value is only re-calculated if either of these dependencies change. This can help
optimize performance by avoiding unnecessary re-calculations of the `price` value. */
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  /* The `useMemo` hook is used to memoize the `reservationDate` value. It returns a formatted string
representing the reservation date range if the `reservation` object exists, otherwise it returns
`null`. The dependencies array `[reservation]` is passed as the second argument to `useMemo` to
ensure that the value is only re-calculated if the `reservation` object changes. This can help
optimize performance by avoiding unnecessary re-calculations of the `reservationDate` value. */
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl"
        >
          <Image
            fill
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition"
            src={data.imageSrc}
            alt="Listing"
          />
          {currentUser && (
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          )}
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
