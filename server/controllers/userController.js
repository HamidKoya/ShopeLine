import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sentEmail from "../utils/sentEmail.js";
import crypto from "crypto";

//Register user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Credentials");
  }
});

//Login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  res.status(401);
  throw new Error("Invalid email or password");
});

//update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//logout user

const logoutUser = asyncHandler(async (req, res) => {
  res
    .cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
    .status(200)
    .json({ message: "Logged out Successfully" });
});

//Forgot password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not Found");
  }

  const resetToken = user.createPasswordResetToken();
  console.log(resetToken);
  user.save();
  const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
  const message = `Forgot Password? Click on this link to reset your password: ${resetUrl}`;
  try {
    await sentEmail({
      email: user.email,
      subject: "token valid for 10 minutes",
      message,
    });

    res.status(200).json({
      message: "token sent to email",
    });
  } catch (error) {
    user.PasswordResetToken = undefined;
    user.PasswordResetTokenExpires = undefined;
    user.save();
    console.log(error);
    res.status(500).json({
      status: error,
      message: "Error in sending email, Please Try again later",
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  console.log('token===',+req.params.resetToken);
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const user = await User.findOne({
    PasswordResetToken: hashedToken,
    PasswordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res
      .status(400)
      .json({ status: 'fail', message: "Token is invalid or has expired" });
  }

  user.password = req.body.password
  user.PasswordResetToken = undefined;
  user.PasswordResetTokenExpires = undefined;
  user.save()
  generateToken(res,user._id)
  res.json({
    _id: user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin
  })

});


 
export {
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
};
