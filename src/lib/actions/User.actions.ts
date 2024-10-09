"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const createUser = async (user) => {
    try {
        const {name, email, password, confirmPassword} = user;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if(userExists) {
            throw new Error("User already exists");
        }
        const pwHash = await hashPassword(password)
        return await prisma.user.create({
            data: {
                name,
                email,
                password: pwHash
            }
        })
    } catch(e) {
        console.error(e);
        return {
            error: {
                message: e.message
            }
        };
    }
}

export const getUserByEmail = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email
        }
    });
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}