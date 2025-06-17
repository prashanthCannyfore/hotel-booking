// get / api/user/
import User from "../models/User.js";


export const getUserData = async (req, res)=>{
    try {
        const role = req.User.role;

        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success: true, role, recentSearchedCities})
    }catch(error){
        res.json({success: false, message: error.message})

    }
}


export const storeRecentSearchedCities = async(req, res)=>{
    try {
        const {recentSearchedCitiy} = req.body;
        const user = await req.user;
        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCitiy)
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCitiy)
        }
        await user.save();
        res.json({success: true, message: "city added"})
    } catch (error) {
        res.json({success: true, message: "city added"})

    }
}