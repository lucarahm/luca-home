import prisma from '@prisma/client'

export const db = new prisma.PrismaClient();

export async function findByUsername(username){
    const user= await db.user.findUnique({
        where: {
            username: username,
        }
    });

    console.log("Found user: ")
    console.log(user)
    return user;
}