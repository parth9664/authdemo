import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default:""
    },
    role: {
      type: String, enum: ["admin","customer"], default:"customer"
      
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
