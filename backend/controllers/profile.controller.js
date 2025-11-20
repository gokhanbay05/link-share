import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";
import Link from "../models/Link.model.js";

export const updateMyProfile = asyncHandler(async (req, res) => {
  const { bio } = req.body;
  const userId = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { bio: bio || "" },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(updatedUser);
});

export const getPublicProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const links = await Link.find({ owner: user._id }).sort({ order: "asc" });

  res.status(200).json({
    profile: {
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
    },
    links: links,
  });
});

export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const avatarUrl = `/uploads/${req.file.filename}`;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatarUrl: avatarUrl },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
});

export const getMe = (req, res) => {
  res.status(200).json(req.user);
};
