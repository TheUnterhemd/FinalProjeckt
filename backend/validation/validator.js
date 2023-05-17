import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const validator = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(req.headers);
    console.log(token, "token");
    console.log(authHeader, "header");

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next();
    })
};