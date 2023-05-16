import Course from "../models/courseModel.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

//ENVIROMENTALS
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

//CONFIGS
dotenv.config();

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

//FUNCTIONS

export const addCourse = async (req, res, next) => {
  const {
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
    imgURL,
    trainer,
  } = req.body;

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
    imgURL,
    trainer,
  });

  try {
    course.save();

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `picture_${course._id}`,
        folder: `localtrainer/picture/course/${course._id}`,
      });

      course.imgURL = result.secure_url;
    }
    await course.save();
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({ course, message: "course added" });
};

export const updateCourse = async (req, res, next) => {
  const id = req.params.id;
  const {
    title,
    description,
    price,
    location,
    maxStudents,
    type,
    start,
    end,
    duration,
  } = req.body;
  let course;
  let imgURL;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `picture_${id}`,
        folder: `localtrainer/picture/course/${id}`,
      });

      imageURL = result.secure_url;
    }
    course = await Course.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        price,
        location,
        maxStudents,
        type,
        start,
        end,
        duration,
        imgURL,
      }
    );

    if (!course) {
      return res.status(500).json({ message: "Not able to update course" });
    }
    return res.status(200).json({ course, message: "Course updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find().populate('trainer', 'firstName lastName imgURL').populate('currentStudent', 'firstName lastName imgURL');
    console.log(courses);
  } catch (error) {
    console.log(error.message);
  }
  if (!courses) {
    return res.status(404).json({ message: "No courses found" });
  }
  return res.status(200).json(courses);
};

export const getCourse = async (req, res, next) => {
  let course;
  const id = req.params.id;
  try {
    course = await Course.findOne({ _id: id }).populate('trainer', 'firstName lastName imgURL').populate('currentStudent', 'firstName lastName imgURL');
    console.log(course);
  } catch (error) {
    console.log(error.message);
  }
  if (!course) {
    return res.status(404).json({ message: "No course found" });
  }
  return res.status(200).json(course);
};

export const deleteCourse = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (deletedCourse) {
      res.status(200).json({ message: "Course deleted" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    log.error(error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the course" });
  }
};
