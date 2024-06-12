
import User from "../model/user.model.js";
import nodemailer from "nodemailer";
import { generateToken } from "../utils/jwtutil.js";

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const mailid = "parthpambhar9664@gmail.com";
    const token = generateToken(user);
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
      text: `http://localhost:5173/resetpassword/${token}`,
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
