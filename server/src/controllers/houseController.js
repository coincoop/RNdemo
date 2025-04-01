const HouseModel = require("../models/houseModel");
const asyncHandle = require("express-async-handler");
require("dotenv").config();

const createHouse = asyncHandle(async (req, res) => {
  const {
    ower_id,
    description,
    price,
    address,
    city,
    district,
    ward,
    images,
    images_more,
    area,
    bedrooms,
    bathrooms,
    furnished,
    status,
  } = req.body;

  const existingHouse = await HouseModel.findOne({
    address,
    city,
    district,
    ward,
  });

  if (existingHouse) {
    res.status(401);
    throw new Error(`Nhà đã tồn tại!`);
  }

  const newHouse = new HouseModel({
    ower_id,
    description,
    price,
    address,
    city,
    district,
    ward,
    images,
    images_more,
    area,
    bedrooms,
    bathrooms,
    furnished,
    status,
  });
  await newHouse.save();
  res.status(200).json({
    mess: "Tạo mới thành công nhà!",
    data: {
      id: newHouse.id,
      ower_id,
      description,
      price,
      address,
      city,
      district,
      ward,
      images,
      images_more,
      area,
      bedrooms,
      bathrooms,
      furnished,
      status,
    },
  });
});

module.exports = { createHouse};
