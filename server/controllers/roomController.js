import { response } from "express";
import Hotel from "../models/Hotels.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.josn({ success: false, message: "No Hotel Found" });
    // upload images to cloudinary
    const uploadImages = req.fils.map(async (file) => {
      const Response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    //wait for all imges to uploads to complete
    const images = await Promise.all(uploadImages);
    await Room.createRoom({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.josn({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.josn({ success: false, message: error.message });
  }
};

// to get all rooms

export const getRooms = async (req, res) => {
try {
  const rooms = await Room.find({ isAvailable: true })
    .populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "images",
      },
    })
    .sort({ createdAt: -1 });
  res.json({ success: true, rooms });
} catch (error) {
  res.json({ success: false, message: error.message });
}
}


export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleRoomAvailibily = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability Updtated" });
  } catch (error) {
    res.json({ success: false, message: ErrorEvent.message });
  }
};
