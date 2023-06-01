import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const trainerValidator = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, trainer) => {
    if (err) return res.sendStatus(403);

    if (trainer.user.trainer) {
      req.trainer = trainer;
      next();
    } else {
      res.sendStatus(403);
    }
  });
};

export const userValidator = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if (!user.user.trainer) {
      req.user = user;
      next();
    } else {
      res.sendStatus(403);
    }
  });
};
