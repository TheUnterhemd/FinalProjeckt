import Course from "../models/courseModel.js"
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

//ENVIROMENTALS
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;



//CONFIGS
dotenv.config()

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

//FUNCTIONS

export const addCourse = async (req,res,next) => {

    const{title,description,location,type,maxStudents,currentStudents,price,duration,start,end,imageURL,trainer} = req.body;
    
    const course = new Course({
        title,
        description,
        location,
        type,
        maxStudents,
        currentStudents,
        price,
        duration,
        start,
        end,
        imageURL,
        trainer
    })

    try {
        course.save();

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                public_id: `picture_${course._id}`,
                folder: `localtrainer/picture/course/${course._id}`
            })

            course.imageURL = result.secure_url;

        }
        await course.save()
    } catch (error) {
        console.log(error.message);
    }
    return res.status(200).json({course,message:"course added"})
};