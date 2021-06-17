import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user and get token
//@route POST /api/user/login
//@access Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists && (await userExists.matchPassword(password))) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc get user profile
//@route GET /api/user/profile
//@access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
      token: userExists.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc update user profile
//@route PUT /api/user/profile
//@access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateuser = await user.save();

    res.json({
      _id: updateuser._id,
      name: updateuser.name,
      email: updateuser.email,
      isAdmin: updateuser.isAdmin,
      token: updateuser.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc register user
//@route POST /api/user/
//@access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200);
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
