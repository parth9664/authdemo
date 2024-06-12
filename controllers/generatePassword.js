
import User from "../model/user.model.js";
import nodemailer from "nodemailer";
// import bcrypt from "bcrypt"
import { secretKey } from "../utils/jwtutil.js";
import { encrypt } from "../utils/jwtutil.js";


export async function generatePassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // const token = await bcrypt.hash( user._id.toString() ,10) //////////////////////////////////////////////change
    // const token = user._id //////////////////////////////////////////////change

    const token = encrypt(user._id.toString(), secretKey);
    console.log('Encrypted>>>>>>>>>>>>>>:', token);





    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const mailid = "parthpambhar9664@gmail.com";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailid,
        pass: "sjac ambn kams zhqe",
      },
    });

    const mailOptions = {
      from: mailid,
      to: email,
      subject: "Sending Email using Node.js",
      text: `http://localhost:5173/generatepassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({ message: "error sending email ", error });
      } else {
        res.status(200).json({ message: "email sent" });
      }
    });
  } catch (error) {
    console.log("error:>>>>>> ", error);
  }
}
