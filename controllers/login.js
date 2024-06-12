import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import { generateToken } from "../utils/jwtutil.js";

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(200).json({ message: "user not found pls sign up" });
    }
    const ispassvalid = await bcrypt.compare(password, existinguser.password);
    if (!ispassvalid) {
      console.log("pass not valid");
      return res.status(200).json({ message: "password not valid" });
    }
    const token = generateToken(existinguser);
    res
      .status(200)
      .json({ message: "login successful", token: token, user: existinguser });
  } catch (error) {
    res.status(401).json({ message: "invalid creadentials" });
  }
}
