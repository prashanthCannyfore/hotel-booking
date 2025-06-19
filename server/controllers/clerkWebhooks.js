// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     //create a Svix

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     console.log("Webhook Headers:", headers);
//     console.log("Webhook Body:", req.body);
//     // verifying Hearders
//     await whook.verify(JSON.stringify(req.body), headers);
//     //Getting Data from request body
//     const { data, type } = req.body;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_address,
//       username: data.first_name + " " + data.last_name,
//       image: data.image_url,
//     };

//     // Switch case for different Eveets

//     switch (type) {
//       case "user.created": {
//         await User.create(userData);
//         console.log("✅ User created:", createdUser);
//         break;
//       }

//       case "user.updated": {
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       }
//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         break;
//       }

//       default:
//         break;
//     }
//     res.json({ succes: true, message: "Webhook Recived" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ succes: false, message: error.message });
//   }
// };

// export default clerkWebhooks;
// import express from "express";
// import User from "../models/User.js";
// import { Webhook } from "svix";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     console.log("✅ Webhook Headers:", headers);
//     console.log("✅ Webhook Body:", req.body);

//     await whook.verify(JSON.stringify(req.body), headers);

//     const { data, type } = req.body;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_address,
//       username: data.first_name + " " + data.last_name,
//       image: data.image_url,
//     };

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         console.log("✅ User created:", createdUser);
//         break;

//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;

//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;

//       default:
//         console.log("Unhandled event type:", type);
//         break;
//     }

//     res.status(200).json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// });

// export default router;

// import express from "express";
// import { Webhook } from "svix";
// import User from "../models/User.js";

// const router = express.Router();

// // Webhook handler
// router.post("/", async (req, res) => {
//   try {
//     const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

//     const wh = new Webhook(webhookSecret);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     console.log("✅ Webhook headers received");

//     // Parse and verify the raw body
//     const payload = req.body.toString("utf8");
//     const event = wh.verify(payload, headers); // Throws if invalid signature

//     const { type, data } = event;

//     console.log("📦 Webhook Event Type:", type);
//     console.log("📦 Webhook Data:", JSON.stringify(data, null, 2));

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "no-email",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || "",
//     };

//     switch (type) {
//       case "user.created": {
//         const createdUser = await User.create(userData);
//         console.log("✅ User created in MongoDB:", createdUser);
//         break;
//       }
//       case "user.updated": {
//         await User.findByIdAndUpdate(data.id, userData);
//         console.log("✅ User updated in MongoDB");
//         break;
//       }
//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         console.log("✅ User deleted from MongoDB");
//         break;
//       }
//       default:
//         console.log("⚠️ Unhandled event type:", type);
//         break;
//     }

//     res.status(200).json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// });

// export default router;

// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//   try {
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     console.log("✅ Webhook Headers:", headers);
//     console.log("✅ Webhook Body:", req.body);

//     // Verify the webhook signature
//     await whook.verify(JSON.stringify(req.body), headers);

//     const { data, type } = req.body;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_address,
//       username: `${data.first_name} ${data.last_name}`,
//       image: data.image_url,
//     };

//     switch (type) {
//       case "user.created": {
//         const createdUser = await User.create(userData);
//         console.log("✅ User created:", createdUser);
//         break;
//       }

//       case "user.updated": {
//         await User.findByIdAndUpdate(data.id, userData);
//         console.log("✅ User updated:", userData);
//         break;
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         console.log("🗑️ User deleted:", data.id);
//         break;
//       }

//       default:
//         console.log("⚠️ Unhandled webhook type:", type);
//         break;
//     }

//     res.status(200).json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;
// import { Webhook } from "svix";
// import getRawBody from "raw-body";
// import User from "../models/User.js";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const clerkWebhooks = async (req, res) => {
//   try {
//     const payloadString = (await getRawBody(req)).toString("utf8");

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     const payload = await whook.verify(payloadString, headers);

//     const { data, type } = payload;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || "",
//     };

//     if (!userData.email || !userData.username) {
//       return res.status(400).json({ success: false, message: "Invalid user data" });
//     }

//     switch (type) {
//       case "user.created":
//         console.log("➡️ Creating user in DB:", userData);
//         await User.create(userData);
//         break;
//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         console.log("Unhandled type:", type);
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;
// controllers/clerkWebhook.js

// import { Webhook } from "svix";
// import getRawBody from "raw-body";
// import connectDB from "../configs/db.js"; // Adjust if you're using .ts
// import User from "../models/User.js";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const clerkWebhook = async (req, res) => {
//   if (req.method !== "POST") {
//     return res
//       .status(405)
//       .json({ success: false, message: "Method Not Allowed" });
//   }

//   try {
//     await connectDB();

//     const rawBody = await getRawBody(req);
//     const payloadString = rawBody.toString("utf8");

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     const payload = wh.verify(payloadString, headers);

//     const { data, type } = payload;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || data.profile_image_url || "",
//     };

//     console.log("Webhook Secret:", process.env.CLERK_WEBHOOK_SECRET);
//     console.log("Webhook Headers:", headers);
//     console.log("Payload String:", payloadString);

//     if (!userData.email || !userData.username) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid user data" });
//     }

//     switch (type) {
//       case "user.created":
//         console.log("➡️ Creating user in DB:", userData);
//         await User.create(userData);
//         break;
//       case "user.updated":
//         console.log("✏️ Updating user:", userData);
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         console.log("❌ Deleting user with ID:", data.id);
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         console.log("ℹ️ Unhandled webhook event type:", type);
//     }

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("❌ Webhook Error:", error.message);
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhook;
// import { Webhook } from "svix";
// import getRawBody from "raw-body";
// import connectDB from "../configs/db.js";
// import User from "../models/User.js";

// export const config = {
//   api: {
//     bodyParser: false, // Required by Svix
//   },
// };

// const handler = async (req, res) => {
//   if (req.method !== "POST") {
//     return res
//       .status(405)
//       .json({ success: false, message: "Method Not Allowed" });
//   }

//   console.log("✅ Clerk webhook endpoint was hit!");

//   try {
//     const payload = (await getRawBody(req)).toString("utf8");

//     const headers = {
//       "svix-id": req.headers["svix-id"] || "",
//       "svix-timestamp": req.headers["svix-timestamp"] || "",
//       "svix-signature": req.headers["svix-signature"] || "",
//     };

//     // 🔒 Optional: Log secret to verify it's loading
//     console.log(
//       "Loaded CLERK_WEBHOOK_SECRET:",
//       process.env.CLERK_WEBHOOK_SECRET
//     );

//     console.log("Payload:", payload);
//     console.log("Headers:", headers);

//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     let event;
//     try {
//       event = wh.verify(payload, headers);
//       console.log("✅ Signature verified. Event type:", event.type);
//     } catch (err) {
//       console.error("❌ Signature verification failed:", err.message);
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     console.log("✅ Signature verified. Event:", event.type);

//     const { data, type } = event;

//     await connectDB(); // ✅ Make sure Mongo URI is correct (see below)

//     const userData = {
//       _id: data.id,
//       email:
//         data.email_addresses && data.email_addresses.length > 0
//           ? data.email_addresses[0].email_address
//           : "",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || data.profile_image_url || "",
//     };

//     if (!userData.email || !userData.username) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid user data" });
//     }

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         break;
//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         console.log("Unhandled event type:", type);
//     }

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("❌ Webhook error:", err.message);
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// export default handler;
// controllers/clerkWebhooks.js
// import { Webhook } from "svix";
// import getRawBody from "raw-body";
// import connectDB from "../configs/db.js";
// import User from "../models/User.js";

// const handler = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   console.log("✅ Clerk webhook endpoint was hit!");

//   let payload;
//   try {
//     payload = (await getRawBody(req)).toString("utf8");
//   } catch (err) {
//     console.error("❌ Failed to parse raw body:", err.message);
//     return res.status(400).json({ success: false, message: "Invalid body" });
//   }

//   const headers = {
//     "svix-id": req.headers["svix-id"] || req.headers["Svix-Id"],
//     "svix-timestamp": req.headers["svix-timestamp"] || req.headers["Svix-Timestamp"],
//     "svix-signature": req.headers["svix-signature"] || req.headers["Svix-Signature"],
//   };

//   // Debug log
//   console.log("Headers:", headers);
//   console.log("Payload:", payload);

//   const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//   let event;
//   try {
//     event = wh.verify(payload, headers);
//     console.log("✅ Signature verified. Event type:", event.type);
//   } catch (err) {
//     console.error("❌ Signature verification failed:", err.message);
//     return res.status(400).json({ success: false, message: "Invalid signature" });
//   }

//   const { data, type } = event;

//   try {
//     await connectDB();

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || data.profile_image_url || "",
//     };

//     if (!userData.email || !userData.username) {
//       return res.status(400).json({ success: false, message: "Invalid user data" });
//     }

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         break;
//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         console.log("Unhandled event type:", type);
//     }

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("❌ Webhook handling error:", err.message);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export default handler;
// import { Webhook } from "svix";
// import getRawBody from "raw-body";
// import connectDB from "../configs/db.js";
// import User from "../models/User.js";

// export const config = {
//   api: {
//     bodyParser: false, // Important for signature verification
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res
//       .status(405)
//       .json({ success: false, message: "Method Not Allowed" });
//   }

//   let payload;
//   let event;

//   try {
//     payload = (await getRawBody(req)).toString("utf8");

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };
//     console.log("HEADERS:", headers);
//     console.log("🔐 Raw payload:", payload);
//     console.log("🔐 Headers:", headers);

//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     event = wh.verify(payload, headers);

//     console.log("✅ Signature verified. Event type:", event.type);

//     const { data, type } = event;

//     await connectDB();

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || data.profile_image_url || "",
//     };

//     if (!userData.email || !userData.username) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid user data" });
//     }

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         break;
//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         console.log("Unhandled event type:", type);
//     }

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("❌ Webhook error:", err.message);
//     return res.status(400).json({ success: false, message: err.message });
//   }
// }

import express from "express";
import { Webhook } from "svix";
import getRawBody from "raw-body";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Middleware to parse raw body for signature verification
router.post("/", async (req, res) => {
  let payload;
  let headers;

  try {
    payload = (await getRawBody(req)).toString("utf8");

    headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("🔐 Webhook received");
    console.log("🔐 Raw payload:", payload);
    console.log("🔐 Headers:", headers);
  } catch (error) {
    console.error("❌ Error parsing raw body:", error);
    return res.status(400).send("Invalid body");
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(payload, headers);
    console.log("✅ Signature verified:", evt.type);
  } catch (err) {
    console.error("❌ Signature verification failed:", err.message);
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const eventType = evt.type;
  const eventData = evt.data;

  // 🔄 Handle different Clerk event types
  switch (eventType) {
    case "user.created":
      console.log("👤 User created:", eventData.id, eventData.email_addresses?.[0]?.email_address);
      // Add your custom logic here
      break;

    case "user.updated":
      console.log("🔄 User updated:", eventData.id);
      break;

    case "user.deleted":
      console.log("🗑️ User deleted:", eventData.id);
      break;

    default:
      console.log("ℹ️ Unhandled event type:", eventType);
  }

  res.status(200).json({ success: true });
});

export default router;
