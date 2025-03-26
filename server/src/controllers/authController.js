const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandle = require("express-async-handler");
const jwt = require('jsonwebtoken')

const getJWT = async (email,id )=>{
    const payload={
        email, id
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY,{
        expiresIn: '7d',
    });

    return token;
}

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
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        accessToken: await getJWT(email, newUser.id),
    },
  });
});

module.exports = {
  register,
};
