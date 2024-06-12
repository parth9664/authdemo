import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/jwtutil.js";

// Function to verify token

// Reset password function
export async function resetPassword(req, res) {
  const { tokenId } = req.params;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Verify the token
    const decodedToken = await verifyToken(tokenId);

    // Find user by decoded token
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Generate a new token after password reset
    // const newToken = generateToken(user);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
