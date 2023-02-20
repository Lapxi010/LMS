import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

export const addMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;
        const message = await db.message.create({
            data: {
                chatId: chatId,
                senderId: senderId,
                text: text
            }
        })

        res.status(200).json(message)
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        const result = await db.message.findMany({
            where: {
                chatId: chatId
            }
        })
        res.status(200).json(result)
    }catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        })
    }
}