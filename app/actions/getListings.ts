import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(
    params: IListingsParams
) {

    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        // if (category) {
        //     query.category = category;
        // }

        // if (roomCount) {
        //     query.roomCount = {
        //         gte: +roomCount
        //     }
        // }

        // if (guestCount) {
        //     query.guestCount = {
        //         gte: +guestCount
        //     }
        // }

        // if (bathroomCount) {
        //     /* Setting a filter condition for the `bathroomCount` field in a database query. The `gte`
        //     operator stands for "greater than or equal to", and it is used to retrieve records where
        //     the `bathroomCount` value is greater than or equal to the value of the `bathroomCount`
        //     parameter passed to the function. The `+` sign before the `bathroomCount` variable is
        //     used to convert it to a number, in case it was passed as a string. */
        //     query.bathroomCount = {
        //         gte: +bathroomCount
        //     }
        // }

        // if (locationValue) {
        //     query.locationValue = locationValue;
        // }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }

}