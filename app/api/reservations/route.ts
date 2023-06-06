import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

/**
 * This function creates a reservation for a listing with the given parameters and returns the updated
 * listing with the new reservation.
 * @param {Request} request - The HTTP request object containing information about the incoming
 * request, such as headers, body, and URL.
 * @returns a JSON response containing the updated listing and reservation data. If the currentUser is
 * not found or if any of the required fields (listingId, startDate, endDate, totalPrice) are missing
 * from the request body, the function returns an error response.
 */
export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}