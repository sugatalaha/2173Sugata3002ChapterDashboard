import { configDotenv } from "dotenv";
configDotenv();

export const isAdmin=(req,res,next)=>
{
  try {
    if (!req.body.password || req.body.password!==process.env.ADMINPASSWORD) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}