import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

// @desc Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      avatar,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
      companyName: user.companyName || "",
      companyDescription: user.companyDescription || "",
      companyLogo: user.companyLogo || "",
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
      companyName: user.companyName || "",
      companyDescription: user.companyDescription || "",
      companyLogo: user.companyLogo || "",
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in user
const getMe = async (req, res) => {
  res.json(req.user);
};

export { registerUser, loginUser, getMe };