import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Missing fields",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        msg: "user exists already",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "user created successfully",
    });
  } catch (error) {
    console.log("error in create user");
    console.log(error);

    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Missing fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        msg: "user doesn't exist",
      });
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const payload = {
      user: {
        id: existingUser.id,
        name: existingUser.name,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return res.status(200).json({
      msg: "login successful",
      token: token,
    });
  } catch (error) {
    console.log("error in login ");

    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleUpdate = async (req, res) => {};

export const handleDelete = async (req, res) => {};
