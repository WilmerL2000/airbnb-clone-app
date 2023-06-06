import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

/**
 * This function retrieves a list of favorite listings for the current user, with error handling.
 * @returns The `getFavoriteListings` function returns a Promise that resolves to an array of safe
 * favorite listings. If there is no current user, an empty array is returned. If there is an error, it
 * is thrown as an Error object.
 */
export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toString(),
        }));

        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}