import User from "../models/User.js";

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const { name, surname, email, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, surname, email, phone },
    { new: true, runValidators: true }
  ).select("-password");

  res.json(updatedUser);
};
