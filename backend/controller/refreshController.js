import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Trainer from "../models/trainerModel.js";
import Refresh from "../models/refreshModel.js";

//CONFIGS
dotenv.config();

//ENVIROMENTALS
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const secret = process.env.JWT_SECRET;
const salt = Number(process.env.SALT_ROUNDS);

// Funktion zum Generieren eines JWT Access Tokens
const generateAccessToken = (user) => {
  // Hier wird der Access Token generiert, abhängig von den Anforderungen deiner Anwendung
  // Beispiel: 
  return jwt.sign({ userId: user.id }, secret, { expiresIn: '1d' });
};

// Funktion zum Überprüfen des Refresh Tokens und Generieren eines neuen Access Tokens
export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Ungültiger Refresh Token' });
  }

  try {
    // Überprüfe den Refresh Token
    const decoded = jwt.verify(refreshToken, refreshSecret);

    // Suche den Refresh Token in der Datenbank
    const token = await Refresh.findOne({ refreshToken });

    if (!token) {
      return res.status(401).json({ error: 'Ungültiger Refresh Token' });
    }

    // Überprüfe, ob der Refresh Token einem Trainer oder Benutzer gehört
    let user;
    if (token.trainer) {
      user = await Trainer.findById(token.trainer).select('-password');
    } else if (token.user) {
      user = await User.findById(token.user).select('-password');
    } else {
      return res.status(401).json({ error: 'Ungültiger Refresh Token' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Benutzer nicht gefunden' });
    }

    // Erhöhe den Count in der Refresh Token-Datenbank um eins
    token.count += 1;
    await token.save();

    // Generiere einen neuen Access Token
    const accessToken = generateAccessToken(user);

    // Sende den neuen Access Token an den Client
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: 'Ungültiger Refresh Token' });
  }
};