import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

/**
 * This function returns a promise that resolves to the server session obtained using the provided
 * authentication options.
 * @returns The `getSession` function is returning a promise that resolves to the result of calling the
 * `getServerSession` function with the `authOptions` parameter. The `await` keyword is used to wait
 * for the promise to resolve before returning its result.
 */
export async function getSession() {
    return await getServerSession(authOptions)
}

/**
 * The function gets the current user's session and returns the user's information if they are
 * authenticated, or null if they are not.
 * @returns The `getCurrentUser` function returns a promise that resolves to either the current user
 * object (with additional properties `createdAt`, `updatedAt`, and `emailVerified` in ISO string
 * format) if the user is authenticated and found in the database, or `null` if the user is not
 * authenticated or an error occurs.
 */
export default async function getCurrentUser() {
    try {
        /* `const session = await getSession();` is calling the `getSession` function and waiting for
        it to resolve before assigning the result to the `session` variable. The `getSession`
        function returns a promise that resolves to the server session obtained using the provided
        authentication options. Therefore, `const session` will contain the server session object if
        the user is authenticated, or `null` if the user is not authenticated or an error occurs. */
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        //Getting current user
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
        };

    } catch (error: any) {
        return null;
    }
}