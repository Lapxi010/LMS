import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";

const db = new PrismaClient();

const generateToken = ({id, email, password, role}) => {
    return jwt.sign({id, email, password, role}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

export const register = async (req, res) => {
    try {
        const {fio, email, password, sex, role, phone} = req.body;

        if (!fio || !email || !password || !sex || !role || !phone) {
            return res.status(404).json({
                message: 'Все поля должны быть заполнены'
            });
        }

        const candidate = await db.user.findUnique({
            where: {
                email
            }
        });

        if (candidate) {
            return res.status(404).json({
                message: 'Такой пользователь уже существует'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                fio,
                email,
                sex,
                role,
                phone: phone,
                password: hashPassword,
            }
        })
        const token = await generateToken({id: user.id, email, password, role})
        req.session.token = token;
        res.status(200).json({
            user: {
                id: user.id,
                fio: user.fio,
                email: user.email,
                phone: user.phone,
                sex: user.sex,
                role: user.role,
            }
        });
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const candidate = await bcrypt.compare(password, user.password);

        if (!candidate) {
            return res.status(404).json({
                message: 'Пароль не верный'
            })
        }
        const id = user.id
        const token = generateToken({id, email, password, role: user.role})

        req.session.token = token;
        res.status(200).json({
            user: {
                id: user.id,
                fio: user.fio,
                email: user.email,
                phone: user.phone,
                sex: user.sex,
                role: user.role,
            }
        });
    } catch (e) {
        res.status(500).json({
            message: 'Не удалось сделать запрос'
        })
    }
}
export const authMe = async (req, res) => {
    try {
        const id = req.userId
        const user = await db.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(404).json(
                {
                    message: 'Пользователь не найден'
                }
            );
        }

        res.status(200).json({
            user: {
                id: user.id,
                fio: user.fio,
                email: user.email,
                phone: user.phone,
                sex: user.sex,
                role: user.role,
            }
        });

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось сделать запрос'
        })
    }
}
