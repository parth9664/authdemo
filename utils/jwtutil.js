import jwt from "jsonwebtoken";
import crypto from "crypto";

export const secretKey = "asdfghjkkjhgf"
export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// export function generaterefreshtoken(user){
//         const payload = {
//             id:user._id,
//             email:user.email,
//             role:user.role
//         }
//        return jwt.sign( payload, secretkey, {expiresIn: "7h"})
// }


export function encrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}


export function decrypt(encryptedText, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
