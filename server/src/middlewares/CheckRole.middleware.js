import jwt from 'jsonwebtoken';

export default (role) => {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next();
		}
		try {
			const token = req.session.token;
			if (!token) {
				return res.status(401).json({message: 'Не авторизован'});
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			if (decoded.role !== role) {
				return res.status(403).json({message: 'Нет доступа'});
			}
			req.userId = decoded.id;
			next();
		} catch (e) {
			res.status(401).json({message: 'Не авторизован'});
		}
	};
};
