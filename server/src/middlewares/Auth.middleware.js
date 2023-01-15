import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	if(req.method === 'OPTIONS') {
		next();
	}
	const authorizationHeader = req.headers.authorization;
	if (authorizationHeader) {
		try {
			const accessToken = authorizationHeader.split(' ')[1];
			const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
			req.userId = decoded.id;

			next();
		} catch (e) {
			return  res.status(403).json({
				message: 'Нет доступа, так как нет прав'
			});
		}
	} else {
		return res.status(403).json({
			message: 'Нет доступа, так как нет прав'
		});
	}
};
