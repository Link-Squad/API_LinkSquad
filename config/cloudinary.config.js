const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'link-squad',
		allowedFormats: ['jpg', 'png'],
	}
});

module.exports = multer({ storage });
