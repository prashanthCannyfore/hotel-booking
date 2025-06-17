import { response } from "express";
import Hotel from "../models/Hotels.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js"

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
    res.josn({ success: false, message: error.message})
  }

};

// to get all rooms

export const getRooms = async (req, res) => {};
 try {
    const rooms = await Room.find({isAvailable: true}).populate({
        path: 'hotel',
        populate:{
            path:'owner',
            select: 'images',
            
        }
    })
 } catch (error) {
    
 }
export const getOwnerRooms = async (req, res) => {};

export const toggleRoomAvailibily = async (req, res) => {};
