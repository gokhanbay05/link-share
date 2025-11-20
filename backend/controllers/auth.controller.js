import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    res.status(400);
    throw new Error("A user already exists with this username or email");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  generateToken(user._id, res);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  });
});

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
