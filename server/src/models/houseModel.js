const { default: mongoose } = require("mongoose");

const HouseSchema = new mongoose.Schema({
  ower_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  ward: {
    type: String,
    require: true,
  },
  images: {
    type: String,
    require: true,
  },
  images_more: {
    type: String,
    require: true,
  },
  area:{
    type: Number,
    require: true,
  },
  bedrooms: {
    type: Number,
    require: true
  },
  bathrooms:{
    type: Number,
    require: true
  },
  furnished: {
    type: Boolean,
    require: true
  },
  status: { 
    type: Number,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const HouseModel = mongoose.model("houses", HouseSchema);
module.exports = HouseModel;
