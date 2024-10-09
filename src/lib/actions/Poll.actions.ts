"use server";

import {z} from "zod";
import prisma from "@/lib/prisma";
import {auth} from "@/lib/auth";
import {getUserByEmail} from "@/lib/actions/User.actions";
import {redirect} from "next/navigation";

const schema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must be at most 100 characters long"),
    options: z.array(
        z
            .string()
            .min(1, "Option must be at least 1 character long")
            .max(100, "Option must be at most 100 characters long"))
        .min(2, "Poll must have at least 2 options")
        .optional(),
    description: z.string().max(500, "Description must be at most 500 characters long"),
    dateStart: z.date(),
    dateEnd: z.date()
})

export const createPoll = async (prevState: any, formData: FormData) => {
    const title = formData.get("title") as string;
    const options = formData.getAll("options") as string[];
    const description = formData.get("description") as string;
    const dateStart = new Date(formData.get("date-start") as string);
    const dateEnd = new Date(formData.get("date-end") as string);

    const validatedFields = schema.safeParse({
        title,
        options,
        description,
        dateStart,
        dateEnd
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const user = await auth();
    if(user === null) {
        return {
            errors: {
                title: "You must be signed in to create a poll"
            }
        }
    }
    const reelUser = await getUserByEmail(user.email);
    const poll = {
        title,
        options: {
            create: options.map(text => ({text}))
        },
        description,
        dateStart,
        dateEnd,
        userId: reelUser.id
    }
    await prisma.poll.create({
        data: poll
    })
    redirect("/dashboard/polls/");
}

export const modifyPoll = async (prevState: any, formData: FormData) => {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dateStart = new Date(formData.get("date-start") as string);
    const dateEnd = new Date(formData.get("date-end") as string);

    const validatedFields = schema.safeParse({
        title,
        description,
        dateStart,
        dateEnd
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const user = await auth();
    if(user === null) {
        return {
            errors: {
                title: "You must be signed in to create a poll"
            }
        }
    }
    const poll = {
        title,
        description,
        dateStart,
        dateEnd,
    }
    await prisma.poll.update({
        data: poll,
        where: {
            id: id
        }
    })
    redirect("/dashboard/polls/");
}

export const deletePoll = async (id: string) => {
    await prisma.poll.delete({
        where: {
            id
        }
    })
    redirect("/dashboard/polls/");
}

export const getPollsByUser = async (userId: string) => {
    return prisma.poll.findMany({
        where: {
            userId
        },
        include: {
            options: {
                include: {
                    vote: true
                }
            },
            vote: true
        }
    })
}

export const getPollById = async (id: string) => {
    return prisma.poll.findUnique({
        where: {
            id
        },
        include: {
            options: {
                include: {
                    vote: true
                }
            },
            vote: true
        }
    })
}

export const createVote = async (pollId: string, optionId: string) => {
    const user = await auth();
    if(user === null) {
        return {
            errors: {
                title: "You must be signed in to create a poll"
            }
        }
    }
    const reelUser = await getUserByEmail(user.email);
    await prisma.vote.create({
        data: {
            optionId,
            userId: reelUser.id,
            pollId
        }
    });

}