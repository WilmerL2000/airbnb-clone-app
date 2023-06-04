import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

/**
 * This is an async function that retrieves a listing by its ID and includes the associated user,
 * returning the listing object with some additional properties converted to strings.
 * @param {IParams} params - The parameter `params` is an object that contains the `listingId`
 * property, which is used to find a unique listing in the database using Prisma ORM. The function
 * returns the listing object with additional properties such as `createdAt` and `user`, which includes
 * the user object associated with the listing
 * @returns a Promise that resolves to an object containing information about a listing, including its
 * ID, creation date, and associated user. If the listing does not exist, the function returns null.
 */
export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
                emailVerified:
                    listing.user.emailVerified?.toString() || null,
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}