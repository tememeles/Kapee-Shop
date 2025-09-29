import express from 'express';
import { cloudinary, upload } from '../cloudinaryConfig.js';

const router = express.Router();

// POST /api/upload - upload image to Cloudinary
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }
    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Cloudinary upload failed.' });
      }
      res.status(200).json({ url: result.secure_url });
    }).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
