import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';
import {v4} from 'uuid';
import {sendMail, generateToken, saveToken, removeToken} from '../services/User.service';
const db = new PrismaClient();

export const register = async (req, res) => {
    try {
        const {fio, email, password, sex, role, phone} = req.body;

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

        const activationLink = v4();

        const user = await db.user.create({
            data: {
                fio,
                email,
                sex,
                role,
                activationLink,
                phone: phone,
                password: hashPassword,
            },
            include: {
                Member: true
            }
        });

        await sendMail(email, `http://localhost:${process.env.PORT}/api/v1/users/activate/${activationLink}`);

        const {accessToken, refreshToken} = generateToken({id: user.id, email, password, role});

        await saveToken(user.id, refreshToken);

        res.cookie('token', refreshToken);

        res.status(200).json({
            user: {
                id: user.id,
                fio: user.fio,
                email: user.email,
                phone: user.phone,
                sex: user.sex,
                role: user.role,
                isActivated: user.isActivated,
                member: user.Member
            },
            accessToken,
            refreshToken
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
};
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await db.user.findUnique({
            where: {
                email
            },
            include: {
                Member: true
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'Email или пароль неправильный!'
            });
        }

        const candidate = await bcrypt.compare(password, user.password);
        if (!candidate) {
            return res.status(404).json({
                message: 'Email или пароль неправильный!'
            });
        }
        const id = user.id;

        const {accessToken, refreshToken} = generateToken({id: user.id, email, password});

        await saveToken(user.id, refreshToken);

        res.cookie('token', refreshToken);

        res.status(200).json({
            user: {
                id: user.id,
                fio: user.fio,
                email: user.email,
                phone: user.phone,
                sex: user.sex,
                role: user.role,
                isActivated: user.isActivated,
                member: user.Member
            },
            accessToken,
            refreshToken
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Произошла ошибка!'
        });
    }
};

export const logout = async (req, res) => {
    try {
        const {token} = req.cookies;

        if (!token) {
            return res.status(403).json({
                message: 'Пользователь не авторизован'
            })
        }

        const data = await removeToken(token)

        res.clearCookie('token')

        return res.status(200).json({message: data})

    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}

export const refresh = async (req, res) => {
    try {
        const {token} = req.cookies

        const candidate = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)

        const token1 = await db.token.findUnique({
            where: {
                refreshToken: token
            }
        });

        if (!candidate) {
            return res.status(403).json({
                message: 'Пользователь не авторизован'
            })
        }

        if (!token1) {
            return res.status(403).json({
                message: 'Пользователь не авторизован'
            })
        }

        const user = await db.user.findUnique({
            where: {
                id: token1.userId
            },
            include: {
                Member: true
            }
        })

        const {accessToken, refreshToken} = generateToken({
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role
        });

        await saveToken(user.id, refreshToken);

        return res.cookie('token', refreshToken).status(200).json({
            user: {
                id: user.id,
                fio: user.fio,
                email: user.email,
                phone: user.phone,
                sex: user.sex,
                role: user.role,
                isActivated: user.isActivated,
                member: user.Member
            },
            accessToken,
            refreshToken
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Не удалось сделать запрос'
        });
    }
}

export const activate = async (req, res) => {
    const activationLink = req.params.link;

    const user = await db.user.findUnique({
        where: {
            activationLink
        }
    });

    if (!user) {
        return res.status(404).json({message: 'Такой пользователь не найден'});
    }
    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            isActivated: true
        }
    });

    return res.redirect(process.env.CLIENT_URL);
}

export const update = async (req, res) => {
    const {fio} = req.body;
    const id = req.userId

    const user = await db.user.update({
        where: {
            id: id
        },
        data: {
            fio: fio
        }
    })

    return res.status(200).json({
        message: 'ok'
    })
}

export const enterCourse = async (req, res) => {
    const {idCourse} = req.body;
    const id = req.userId

    const member = await db.member.create({
        data: {
            userId: id,
            courseId: idCourse
        }
    });

    return res.status(200).json({
        member
    })
}