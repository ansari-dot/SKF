import jwt from 'jsonwebtoken';

export const auth = async(req, res, next) => {
    try {
        // Check for token in cookies or Authorization header
        let token = req.cookies.token;
        
        // If token not in cookies, check Authorization header
        const authHeader = req.headers.authorization;
        if (!token && authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "sk");
        req.user = { _id: decoded.id, id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};