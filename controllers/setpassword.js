import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { secretKey } from "../utils/jwtutil.js";
import { decrypt } from "../utils/jwtutil.js";

// Reset password function
export async function setpassword(req, res) {
  
  const { token } = req.params;
  //  const sample = bcrypt.compare()  ///////////////compare



  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);


  ///////////////////////////////////////////
  try {

    const decryptedText = decrypt(token, secretKey);
    console.log('Decrypted>>>>>>>.:', decryptedText);
  
  if (decryptedText) {
    const user = await User.findById(decryptedText);
    console.log(user);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password set successful" });
  }



///////////////////////////////////////////////////////////////////
   
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
