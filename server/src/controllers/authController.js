const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const getJWT = async (email, id) => {
  const payload = {
    email,
    id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};

const register = asyncHandle(async (req, res) => {
  const { email, name, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(401);
    throw new Error(`User đã tồn tại!`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(200).json({
    mess: "Register tạo mới thành công user!",
    data: {
      name: newUser.name,
      id: newUser.id,
      email: newUser.email,
      accessToken: await getJWT(email, newUser.id),
    },
  });
});

const login = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    res.status(403);
    throw new Error(`User không tồn tại!`);
  }
  const isMatchPassword = await bcrypt.compare(password, existingUser.password);

  if (!isMatchPassword) {
    res.status(401);
    throw new Error(`Email hoặc mật khẩu sai!`);
  }

  res.status(200).json({
    message: "Đăng nhập thành công",
    data: {
      name: existingUser.name,
      id: existingUser.id,
      email: existingUser.email,
      accessToken: await getJWT(email, existingUser.id),
    },
  });
});

const handleSendMail = async (val, email) => {
 
  try {
      await transporter.sendMail({
      from: `Support RNdemo <${process.env.EMAIL}>`,
      to: email,
      subject: "Verification Email",
      text: "Your code verification email",
      html: `<b>${val}</b>`,
    });
    return 'OK'
  } catch (error) {
    return error
  }
};

const verification = asyncHandle(async (req, res) => {
  const verificationCode = Math.round(1000 + Math.random() * 9000);
  const { email } = req.body;

  //check email
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(401).json({
      message: 'Email đã tồn tại',
      data: {
        error: 'Email đã tồn tại'
      }
    });
    throw new Error(`User đã tồn tại!`);
  }
  try {
    await handleSendMail(verificationCode, email);

    res.status(200).json({
      message: 'Gửi mã xác nhận thành công',
      data: {
        code: verificationCode
      }
    })
  } catch (error) {
    res.status(401)
    throw new Error('Không thể gửi mã xác nhận')
  }
});

module.exports = {
  register,
  login,
  verification,
};
