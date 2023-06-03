import { PrismaClient } from "@prisma/client";

/* `declare global` is a TypeScript keyword that allows you to declare a global variable that can be
accessed from anywhere in your code. In this case, it is declaring a global variable named `prisma`
of type `PrismaClient` or `undefined`. This allows the `prisma` variable to be accessed and used
throughout the application without having to import it into every file. */
declare global {
    var prisma: PrismaClient | undefined;
}

/* This code initializes a new instance of the PrismaClient if `globalThis.prisma` is undefined, or
uses the existing instance if it already exists. The `globalThis` object is used to access the
global `prisma` variable, which is declared in the `declare global` block as a `PrismaClient` or
`undefined`. This pattern is commonly used to ensure that only one instance of the PrismaClient is
created and used throughout the application. */
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client