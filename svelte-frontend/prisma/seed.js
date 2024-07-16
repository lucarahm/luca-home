import {PrismaClient} from '@prisma/client'
import {generateIdFromEntropySize} from "lucia";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();


async function main() {

    const userRole = await prisma.roles.create({
        data: {
            id: 1,
            name: "USER"
        }
    })
    console.log(`Create role with id: ${userRole.id}`)

    const user = await prisma.user.create({
        data: {
            id: generateIdFromEntropySize(10),
            username: process.env.ADMIN_USERNAME,
            firstName: "Luca",
            lastName: "Rahm",
            isAdmin: true,
            password_hash: process.env.ADMIN_PW_HASH,
            email: process.env.ADMIN_EMAIL,
            roleId: userRole.id
        }
    })
    console.log(`Create user with id: ${user.id}`)

    console.log('Seeding finished.')
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})