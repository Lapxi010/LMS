import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const db = new PrismaClient();
export const sendMail = async (email, link) => {

    const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'lmslapxi@gmail.com',
            pass: 'rwluawpinbxfgkyr'
        }
    });

    const mailOptions = {
        from: 'lmslapxi@gmail.com',
        to: email,
        subject: 'Активация акаунта',
        text: `Follow the link to activate your password: ${link}`,
        html:
            `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
    };
    const res = await transporter.sendMail(mailOptions);
}

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await db.token.findUnique({
        where: {
            userId
        }
    });
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        const token = await db.token.update({
            where: {
                userId
            },
            data: tokenData
        });
        return token;
    }
    const token = await db.token.create({
        data: {
            userId,
            refreshToken,
        }
    });
    return token
}

export const removeToken = async (refreshToken) => {
    const token = await db.token.delete({
        where: {
            refreshToken
        }
    });
    return token;
}

export const generateToken = ({id, email, password, role}) => {
    const accessToken = jwt.sign({id, email, password, role}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
    const refreshToken = jwt.sign({id, email, password, role}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
    return {
        accessToken,
        refreshToken
    }
};
