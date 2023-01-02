import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export const queries = {
    users: (_, __, ctx) => {
        if(ctx.req.username){
            return prisma.user.findMany();
        }else {
            return prisma.user.findMany({
                select: {
                    name: true,
                    email: true,
                    password: false
                }
            })
        }
    }
}
