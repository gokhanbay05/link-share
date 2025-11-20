import asyncHandler from "express-async-handler";
import Link from "../models/Link.model.js";

export const createLink = asyncHandler(async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    res.status(400);
    throw new Error("Title and URL are required");
  }

  const lastLink = await Link.findOne({ owner: req.user._id }).sort({
    order: -1,
  });
  const newOrder = lastLink ? lastLink.order + 1 : 0;

  const link = await Link.create({
    title,
    url,
    owner: req.user._id,
    order: newOrder,
  });

  res.status(201).json(link);
});

export const getMyLinks = asyncHandler(async (req, res) => {
  const links = await Link.find({ owner: req.user._id }).sort({
    order: "asc",
  });

  res.status(200).json(links);
});

export const updateLink = asyncHandler(async (req, res) => {
  const { title, url } = req.body;
  const linkId = req.params.id;
  const link = await Link.findOne({ _id: linkId, owner: req.user._id });

  if (!link) {
    res.status(404);
    throw new Error("Link not found");
  }

  link.title = title || link.title;
  link.url = url || link.url;
  await link.save();

  res.status(200).json(link);
});

export const deleteLink = asyncHandler(async (req, res) => {
  const linkId = req.params.id;

  const link = await Link.findOneAndDelete({
    _id: linkId,
    owner: req.user._id,
  });

  if (!link) {
    res.status(404);
    throw new Error("Link not found");
  }

  res.status(200).json({ message: "Link deleted" });
});

export const reorderLinks = asyncHandler(async (req, res) => {
  const { orderedIds } = req.body;
  const userId = req.user._id;

  if (!Array.isArray(orderedIds)) {
    res.status(400);
    throw new Error("Invalid orderedIds format, expected an array");
  }

  const updatePromises = orderedIds.map((linkId, index) => {
    return Link.updateOne(
      { _id: linkId, owner: userId },
      { $set: { order: index } }
    );
  });

  await Promise.all(updatePromises);

  res.status(200).json({ message: "Links reordered" });
});
