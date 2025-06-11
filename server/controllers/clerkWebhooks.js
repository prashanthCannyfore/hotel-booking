import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_Webhook_SECRET);

    //create a Svix
    const headers = {
      "svix-id": req.headers["svik-time"],
      "svix-timestamp": req.headers["svix-singnature"],
      "svix-timestamp": req.headers["svix-singnature"],
    };
    // verifying Hearders
    await whook.verify(JSON.stringify(req.body), headers);
    //Getting Data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addressess[0].email_addressess,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

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
      case "user.deleated":
        {
          await User.findByIdAndUpdate(data.id, userData);
          break;
        }


      default:
        break;
    }
    res.json({succes: true, message: "Webhook Recived"})
  } catch (error) {

    console.log(error.message);
    res.json({succes: false, message: error.message});
  }
}

export default clerkWebhooks; 
