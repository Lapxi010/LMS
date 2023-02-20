import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

export const createChat = async (req, res) => {
    try {
        const { senderId, receiveId } = req.body
        const chat = await db.chat.create({data:{}})

        const first = await db.memberChat.create({
            data: {
                userId: senderId,
                chatId: chat.id
            }
        })
        const two = await db.memberChat.create({
            data: {
                userId: receiveId,
                chatId: chat.id
            }
        })


        res.status(200).json(chat)
    }catch (e) {

        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        })
    }
}

export const userChats = async (req, res) => {
    try {
        const chat = await db.chat.findMany({
            include: {
                users: true
            }
        })

        let result = []
        for (let i of chat) {
            let tmp = i.users.filter((user) => user.userId === req.params.userId)

            if (tmp.length >= 1) {
                result.push(i)
            }
        }

        res.status(200).json(result)
    }catch (e) {

        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        })
    }
}

export const findChat = async (req, res) => {
    try {
        const chat = await db.chat.findMany({
            include: {
                users: true
            }
        })

        let result = []
        for (let i of chat) {
            let tmp = i.users.filter((user) => (user.userId === req.params.firstId) || (user.userId === req.params.secondId))
            if (tmp.length >= 2) {
                result.push(i)
            }
        }

        res.status(200).json(result)
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        })
    }
}