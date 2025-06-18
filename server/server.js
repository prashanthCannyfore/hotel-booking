import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/UserRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors());

app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);
console.log("✅ Clerk webhook endpoint was hit!");
 
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever is runiing on port ${PORT}`));
