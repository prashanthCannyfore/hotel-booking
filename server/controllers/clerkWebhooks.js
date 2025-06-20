import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //create a Svix
    
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("Webhook Headers:", headers);
    console.log("Webhook Body:", req.body);
    // verifying Hearders
    await whook.verify(JSON.stringify(req.body), headers);
    //Getting Data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    }

    // Switch case for different Eveets

    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
    res.json({ succes: true, message: "Webhook Recived" });
  } catch (error) {
    console.log(error.message);
    res.json({ succes: false, message: error.message });
  }
};

export default clerkWebhooks;
