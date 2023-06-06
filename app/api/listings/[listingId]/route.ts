import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

/**
 * This is an async function that deletes a listing from the database if the current user is
 * authenticated and has the correct permissions.
 * @param {Request} request - The HTTP request object containing information about the incoming
 * request.
 * @param  - - `request`: an object representing the incoming HTTP request
 * @returns a JSON response containing the deleted listing data if the current user is authenticated
 * and authorized to delete the listing. If the current user is not authenticated, it returns an error
 * response. If the listing ID is invalid, it throws an error.
 */
export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}