import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';
import {v4} from 'uuid';
import nodemailer from 'nodemailer';

export const activate = async (req,res) => {
	const activationLink = req.params.link;
	const user = await db.user.findUnique({
		where: {
			activationLink
		}
	});
	if (!user) {
		return res.status(400).json({message: 'User not found'});
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


const sendMail = async (email, link) => {

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

const db = new PrismaClient();

const saveToken = async (userId, refreshToken) => {
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

const removeToken = async (refreshToken) => {
	const token = await db.token.delete({
		where: {
			refreshToken
		}
	});
	return token;
}

const generateToken = ({id, email, password, role}) => {
	const accessToken = jwt.sign({id, email, password, role}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
	const refreshToken = jwt.sign({id, email, password, role}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
	return {
		accessToken,
		refreshToken
	}
};

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
			}
		});

		await sendMail(email, `http://localhost:6789/api/v1/users/activate/${activationLink}`);
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
			},
			accessToken,
			refreshToken
		});
	} catch (e) {
		res.status(500).json({
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
			}
		});

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			});
		}

		const candidate = await bcrypt.compare(password, user.password);
		if (!candidate) {
			return res.status(404).json({
				message: 'Пароль не верный'
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
			},
			accessToken,
			refreshToken
		});
	} catch (e) {
		res.status(500).json({
			message: 'Не удалось сделать запрос'
		});
	}
};
export const authMe = async (req, res) => {
	try {
		const id = req.userId;
		const user = await db.user.findUnique({
			where: {
				id: id
			}
		});

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
		});
	}
};

export const logout = async (req, res) => {
	try {
		const {token} = req.cookies;
		const data = await removeToken(token)
		res.clearCookie('token')
		return res.status(200).json({message: data})
	}catch (e) {
		res.status(500).json({
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

		if (!candidate || !token1) {
			throw Error('dadada')
		}
		const user = await db.user.findUnique({
			where: {
				id: token1.userId
			}
		})
		const {accessToken, refreshToken} = generateToken({id: user.id, email: user.email, password: user.password, role: user.role});
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
			},
			accessToken,
			refreshToken
		});
	}catch (e) {
		res.status(500).json({
			message: 'Не удалось сделать запрос'
		});
	}
}
