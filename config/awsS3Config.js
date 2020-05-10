const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
})

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_IMG_BUCKET,
		acl: 'public-read',
		key: (req, file, cb) => {
			cb(null, `design-${uuidv4()}${path.extname(file.originalname)}`)
		},
	}),
})

module.exports = { upload }
