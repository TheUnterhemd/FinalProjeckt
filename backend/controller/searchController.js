import Trainer from "../models/trainerModel.js";
import Course from "../models/courseModel.js";

export async function search(req, res, next) {
  const query = req.query.q.trim();
  let trainer;
  let courses;
  try {
    trainer = await Trainer.find({
      firstName: { $regex: `(?i)${query}` },
    });
    courses = await Course.find({
      $or: [
        { title: { $regex: `(?i)${query}` } },
        { descripton: { $regex: `(?i)${query}` } },
      ],
    });

    res.json({ trainer, courses });
  } catch (err) {
    console.log(err);
  }
  next();
}
