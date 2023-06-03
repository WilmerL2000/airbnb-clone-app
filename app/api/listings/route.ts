import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body;

    /* This code is iterating over all the keys of the `body` object using the `Object.keys()` method
    and then using the `forEach()` method to execute a function for each key. The function checks if
    the value of the current key is falsy (i.e., `null`, `undefined`, `false`, `0`, `NaN`, or an
    empty string) and if so, it returns an error response using `NextResponse.error()`. This is a
    basic validation check to ensure that all the required fields in the `body` object have a value
    before proceeding with further processing. */
    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            return NextResponse.error();
        }
    });


    /* This code is creating a new listing in the database using the `prisma` ORM. It is using the
    `create()` method of the `listing` model to create a new record in the `listings` table with the
    provided data. The data is passed as an object with properties corresponding to the columns of the
    `listings` table. The `locationValue` property is accessing the `value` property of the `location`
    object. The `price` property is being parsed as an integer using the `parseInt()` method with a
    radix of 10. The `userId` property is being set to the `id` of the current user. The newly created
    listing is then returned as a JSON response using `NextResponse.json()`. */
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}