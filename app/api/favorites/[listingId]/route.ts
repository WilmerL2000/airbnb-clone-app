import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

/**
 * This is an async function that adds a listing ID to a user's list of favorite IDs and returns the
 * updated user object.
 * @param {Request} request - The HTTP request object containing information about the incoming
 * request.
 * @param  - - `request`: an object representing the HTTP request being made
 * @returns a JSON response containing the updated user object after adding a new favorite listing ID
 * to their list of favorite IDs. If there is no current user, it returns an error response. If the
 * listing ID is invalid, it throws an error.
 */
export async function POST(
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

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}

/**
 * This is an async function that deletes a listing ID from a user's favorite IDs and returns the
 * updated user object.
 * @param {Request} request - The HTTP request object containing information about the incoming
 * request.
 * @param  - - `request`: an object representing the incoming HTTP request
 * @returns a JSON response containing the updated user object after removing the specified listing ID
 * from their list of favorite IDs. If there is no current user, it returns an error response. If the
 * listing ID is invalid, it throws an error.
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

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}