//function to check Availabilty of Room

import Booking from "../models/Booking";
import Room from "../models/Room";
import { getUserData } from "./userControler";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = Booking.length === 0;
    return isAvailable;
  } catch (error) {
    console.error(error.message);
  }
};


export const checkAvailabilityApi = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.josn({ success: false, message: error });
  }
};


//api to create a new booking
//Post /api/bookings/book

export const createBooking = async (req, res)=>{
     try {
        const { room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;
        //Before Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if(!isAvailable){
            return res.json({success:false, message: "Room is not available"})
        } 
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkOutDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime()- checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +getUserData,
            checkInDate,
            checkOutDate,
            totalPrice,

        })
     } catch (error) {
        
     }
}