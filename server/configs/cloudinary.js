import { v2 as cloudinary } from "cloudinary";


const connectCloudinary = async ()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
        API_KEY: process.env.CLOUDINARY_API_KEY,
    })
}


export default connectCloudinary;