export { default } from "next-auth/middleware"

/* This code exports a constant object named `config` that contains a property `matcher` which is an
array of strings representing URL paths. This object is likely used as configuration for some
middleware in a Next.js application. The `matcher` property specifies the URL paths that the
middleware should match and handle. */
export const config = {
    matcher: [
        "/trips",
        "/reservations",
        "/properties",
        "/favorites"
    ]
};