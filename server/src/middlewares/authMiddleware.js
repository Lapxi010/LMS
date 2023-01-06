import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }
    const token = req.session.token
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id

            next()
        } catch (e) {
            return  res.status(403).json({
                message: "Нет доступа, так как нет прав"
            })
        }
    } else {
        return res.status(403).json({
            message: "Нет доступа, так как нет прав"
        })
    }
}
