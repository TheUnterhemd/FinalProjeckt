import Course from "../models/courseModel.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Trainer from "../models/trainerModel.js";

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
    location: JSON.parse(location),
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
// Die ID des Kurses, der aktualisiert werden soll
  const id = req.params.id;
// Die zu aktualisierenden Informationen
  const {title,description,price,location,maxStudents,currentStudents,type,start,end,duration,active,} = req.body;
// Variable, um den aktualisierten Kurs zu speichern 
  let course;
// Variable für das Bild-URL des Kurses (falls vorhanden)
  let imgURL;

  try {
// Wenn eine Datei (Bild) in der Anfrage enthalten ist, wird sie zu Cloudinary hochgeladen
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `picture_${id}`,
        folder: `localtrainer/picture/course/${id}`,
      });

      imgURL = result.secure_url; // Die sichere URL des hochgeladenen Bildes wird gespeichert
    }

// Überprüfen, ob der Trainer, der die Anfrage sendet, der Eigentümer des Kurses ist
// ID des angemeldeten Trainers aus dem Authentifizierungstoken
    const trainerId = req.trainer.id; 
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

// Überprüfen, ob der Trainer der Eigentümer des Kurses ist
    if (!trainer.courses.includes(id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this course" });
    }
// Kurs in der Datenbank anhand der ID aktualisieren und die neuen Informationen setzen
    course = await Course.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        price,
        location: JSON.parse(location),
        maxStudents,
        currentStudents,
        type,
        start,
        end,
        duration,
        imgURL,
        active,
      }
    )
      .populate("trainer", "firstName lastName imgURL _id")
      .populate("currentStudents", "firstName lastName imgURL _id");

// Wenn kein Kurs gefunden wurde, gibt es einen Fehler bei der Aktualisierung
    if (!course) {
      return res.status(500).json({ message: "Not able to update course" });
    }

// Erfolgreiche Aktualisierung des Kurses und den aktualisierten Kurs zurückgeben
    return res.status(200).json({ course, message: "Course updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCurrentStudent = async (req, res) => {
  const userId = req.params.student;
  const courseId = req.params.id;

  try {
    let course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { currentStudents: userId } },
      { new: true }
    )
      .populate("trainer")
      .populate("currentStudents");

    if (!course) {
      return res.status(404).json({ error: "Kurs nicht gefunden" });
    }

    res
      .status(200)
      .json({ message: "Benutzer erfolgreich zum Kurs hinzugefügt", course });
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler" });
  }
};

export const getAllCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find()
      .populate("trainer", "firstName lastName imgURL")
      .populate("currentStudents", "firstName lastName imgURL");
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
    course = await Course.findOne({ _id: id })
      .populate("trainer", "firstName lastName imgURL _id")
      .populate("currentStudents", "firstName lastName imgURL _id");
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
