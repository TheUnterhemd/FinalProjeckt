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

    const populatedComment = await Comment.populate(comment, [
      { path: "trainerId", select: "firstName lastName imgURL" },
      { path: "userId", select: "firstName lastName imgURL" }
    ]);
    console.log(populatedComment);
    return res.status(200).json({ populatedComment, message: "Comment added" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
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
    trainerComments = await Comment.find({ trainerId: id }).populate('userId', 'firstName lastName imgURL').populate('trainerId', 'firstName lastName imgURL');
    userComments = await Comment.find({ userId: id }).populate('userId', 'firstName lastName imgURL').populate('trainerId', 'firstName lastName imgURL');
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }

  if (trainerComments.length > 0) {
    return res.status(200).json(trainerComments);
  } else if (userComments.length > 0) {
    return res.status(200).json(userComments);
  } else {
    // Micha: habe die Res geändert, damit können wir easy im Frontend weitermachen
    return res.status(200).json([]);
  }
};

export const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  console.log("deletion fired");
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
