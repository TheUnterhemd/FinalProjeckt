import Trainer from "../models/trainerModel.js";
import Course from "../models/courseModel.js";

export async function search(req, res, next) {
  const query = req.query.q;
  console.log(query);
  try {
    const trainer = await Trainer.find({
      firstName: { $regex: `(?i)${query}` },
    });
    const courses = await Course.find({
      $or: [
        { title: { $regex: `(?i)${query}` } },
        { descripton: { $regex: `(?i)${query}` } },
      ],
    });

    res.json({ trainer: trainer, courses: courses });
  } catch (err) {
    console.log(err);
  }
  next();
}
