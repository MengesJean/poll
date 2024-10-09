import type { NextAuthConfig } from "next-auth"
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import prisma from "@/lib/prisma";
import {UserType} from "@/lib/types/User.type";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    }
                }) as UserType | null;
                if (!user) {
                    throw new Error("User not found.")
                }
                const isValid = bcrypt.compare(credentials.password, user?.password || '');
                if (!isValid) {
                    throw new Error("Invalid password.")
                }
                return user
            }
        })
    ],
} satisfies NextAuthConfig