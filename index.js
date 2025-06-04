import express from "express";
import connectDB from "./utils/db.js";
import { limiter } from "./utils/RateLimiter.js";

import router from "./routes/chapters.routes.js";

const PORT=process.env.PORT||4000;
const app=express();
connectDB();
app.use(express.json());
app.use(limiter); 

app.use("/api/v1",router);

app.listen(PORT,()=>
{
    console.log(`Server listening on port ${PORT}`);
})
