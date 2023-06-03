import prisma from '@/app/libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    /* `adapter: PrismaAdapter(prisma)` is configuring NextAuth to use Prisma as the database adapter.
    The `PrismaAdapter` function takes a Prisma client instance as an argument and returns an
    adapter object that can be used by NextAuth to interact with the database. This allows NextAuth
    to store and retrieve user data from the Prisma database. */
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                /* This code is querying the Prisma database to find a user with a unique email that matches
                the email provided in the `credentials` object. It is using the `findUnique` method of
                the `user` model to perform the query. The result of the query is stored in the `user`
                variable. */
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                /* This code is using the `bcrypt` library to compare the password provided in the
                `credentials` object with the hashed password stored in the `user` object retrieved
                from the Prisma database. The `bcrypt.compare()` method is used to compare the two
                passwords and returns a boolean value indicating whether they match or not. If the
                passwords match, the user is considered authenticated and their information is
                returned. If the passwords do not match, an error is thrown indicating that the
                credentials are invalid. */
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);