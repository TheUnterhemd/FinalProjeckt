import Comment from "../models/commentModel.js";
import dotenv from "dotenv";

//FUNCTIONS

export const addComment = async (req, res, next) => {
  const { body, trainerId, userId } = req.body;

  let comment = new Comment({
    body,
    trainerId,
    userId,
  });

  try {
    await comment.save();
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({ comment, message: "comment added" });
};

export const updateComment = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req.body;
  let comment;

  try {
    comment = await Comment.findByIdAndUpdate({ _id: id }, { body });

    if (!comment) {
      return res.status(500).json({ message: "Not able to update comment" });
    }
    return res.status(200).json({ comment, message: "Comment updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllComments = async (req, res, next) => {
  const id = req.params.id;
  let trainerComments;
  let userComments;

  try {
    trainerComments = await Comment.find({ trainerId: id });
    userComments = await Comment.find({ userId: id });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }

  if (trainerComments.length > 0) {
    return res.status(200).json(trainerComments);
  } else if (userComments.length > 0) {
    return res.status(200).json(userComments);
  } else {
    return res.status(404).json({ message: "No comments found" });
  }
};

export const deleteComment = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (deletedComment) {
      res.status(200).json({ message: "Comment deleted" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    log.error(error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the course" });
  }
};
