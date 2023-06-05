import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

/**
 * This is an async function that retrieves reservations based on certain parameters and returns them
 * in a safe format.
 * @param {IParams} params - The input parameters for the `getReservations` function, which is an
 * object with the following optional properties:
 * @returns an array of safe reservations, where each reservation object has its createdAt, startDate,
 * and endDate properties converted to ISO strings, and the listing object within each reservation has
 * its createdAt property converted to an ISO string as well. The reservations are filtered based on
 * the provided parameters (listingId, userId, and authorId) and are ordered by createdAt in descending
 * order.
 */
export default async function getReservations(
    params: IParams
) {
    try {

        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        };

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });


        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                },
            }));

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}