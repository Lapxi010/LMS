import {PrismaClient} from "@prisma/client";
import {AuthenticationError} from "apollo-server-express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const mutations = {
    signUp: async (_, user) => {
        const result = await prisma.user.create({
            data: user

        })
        return result;
    },
    login: async (_, {name, password}, ctx) => {
        const user = await prisma.user.findUnique({
            where: {
                name
            }
        })
        if (!user) {
            throw new Error('User not found')
        }
        if (user.password !== password) {
            throw new AuthenticationError('Password is incorrect')
        }
        const token = jwt.sign({name: user.name}, 'secret')
        console.log(token)
        ctx.req.session.token = token
        return user
    }
}
