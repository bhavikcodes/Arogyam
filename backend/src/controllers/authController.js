import { User } from "../models/user.js";
import { Hospital } from "../models/hospital.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this phone number" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "user found but Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error in login" });
  }
};

const register = async (req, res) => {
  try {
    const { name, dateOfBirth, gender, phone, password, address, location } =
      req.body;
    const user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    let uuid = uuidv4();
    // in future we would implement otp functoin for registeratoin if possible
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      uuid,
      name,
      dateOfBirth,
      gender,
      role: "citizen",
      phone,
      password: hashedPassword,
      address,
      location,
    });
    try {
      await newUser.save();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error while saving user in database" });
    }
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error in register" });
  }
};

const create = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      role,
      gender,
      phone,
      password,
      address,
      location,
    } = req.body;
    const user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    let uuid = uuidv4();
    const hospitalId = req.body.hospitalId || null;
    // in future we would implement otp functoin for registeratoin if possible
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      uuid,
      name,
      dateOfBirth,
      role,
      gender,
      phone,
      password: hashedPassword,
      address,
      location,
      hospitalId,
    });
    try {
      await newUser.save();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error while saving user in database" });
    }
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error in create" });
  }
};

const hospitalLogin = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    const hospital = await Hospital.findOne({ registrationNumber });
    if (!hospital) {
      return res
        .status(404)
        .json({ message: "hospital not found with this registration number" });
    }
    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "hospital found but Invalid password" });
    }
    const token = jwt.sign(
      { userId: hospital._id, role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(200).json({ hospital, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error in hospitalLogin" });
  }
};

export { login, register, create, hospitalLogin };
