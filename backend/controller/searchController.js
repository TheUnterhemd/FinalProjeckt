import Trainer from "../models/trainerModel.js";
import Course from "../models/courseModel.js";

export async function search(req, res, next) {
  const query = req.query.q.trim()

  let trainer;
  let courses;

  const trainerQuery = {
    firstName: { $regex: `(?i)${query}` },
  };

  const courseQuery = {
    $or: [
      { title: { $regex: `(?i)${query}` } },
      { description: { $regex: `(?i)${query}` } },
    ],
  };

  try {
    trainer = await Trainer.find(trainerQuery).select('-password');
    courses = await Course.find(courseQuery).populate({
      path: "trainer",
      select:"_id imgURL firstName lastName"
    });

    res.json({ trainer, courses });
  } catch (err) {
    console.log(err);
  }
  next();
}
