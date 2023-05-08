import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

//setting up multer & cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "localtrainer/delete",
        format: async(req, file) => {
            let format;
            switch (file.mimetype) {
                case "image/jpeg":
                    format = "jpg";
                    break;
                case "image/png":
                    format = "png";
                    break;
            }
        }
    }
})

export const upload = multer({ storage: storage });