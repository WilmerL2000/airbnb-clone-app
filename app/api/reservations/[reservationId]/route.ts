import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

/**
 * This is an async function that deletes a reservation from the database based on the reservation ID
 * and the current user's ID.
 * @param {Request} request - The HTTP request object containing information about the incoming
 * request.
 * @param  - - `request`: an object representing the incoming HTTP request
 * @returns a JSON response containing the deleted reservation data if the current user is
 * authenticated and authorized to delete the reservation, and an error response if the user is not
 * authenticated or the reservation ID is invalid.
 */
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}