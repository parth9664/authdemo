import express from "express";
import dotenv from "dotenv";
import connectdb from "./db/connectdb.js";
import router from "./routes/user.routes.js";
import cors from "cors";
import { createAdmin } from "./scripts/admin.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

connectdb("mongodb://localhost:27017/authen_app")
  .then(() => {
    console.log("mongodb connected");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
    createAdmin();
  })
  .catch((err) => console.log(err));


  


app.use("/auth", router);
