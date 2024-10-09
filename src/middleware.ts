import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

const authorizedRoute = [
    "/signin",
    "/register",
]

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
    if(!req.auth && !authorizedRoute.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/signin", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}