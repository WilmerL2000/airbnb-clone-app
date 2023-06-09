import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

/**
 * This function creates a new user in a database using Prisma ORM by taking email, name, and password
 * from the request body and hashing the password before creating the user record.
 * @param {Request} request - The `request` parameter is an object that represents the HTTP request
 * that was sent to the server. It contains information such as the request method (e.g. GET, POST),
 * headers, and request body. In this code, the `request` object is used to extract the JSON data from
 * the
 * @returns The code is returning a JSON response containing the newly created user object.
 */
export async function POST(
    request: Request,
) {
    const body = await request.json();

    const {
        email,
        name,
        password,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    /* This code is creating a new user in a database using Prisma ORM. It is taking the email, name,
    and hashed password from the request body and using them to create a new user record in the
    database. The `prisma.user.create` method is a function provided by Prisma that creates a new
    user record in the database with the specified data. The `await` keyword is used to wait for the
    database operation to complete before moving on to the next line of code. The `user` variable is
    assigned the newly created user object returned by the `prisma.user.create` method. */
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    });

    return NextResponse.json(user);
}