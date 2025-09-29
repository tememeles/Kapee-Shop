import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

export { cloudinary, upload };
