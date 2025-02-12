const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to create directories if they don't exist
const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Define upload directories
const resumeUploadDir = path.join(__dirname, '../uploads/resumes');
const imageUploadDir = path.join(__dirname, '../uploads/images');

createDirectory(resumeUploadDir);
createDirectory(imageUploadDir);

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'resume') cb(null, resumeUploadDir);
        else cb(null, imageUploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

// File Filters
const fileFilter = (req, file, cb) => {
    const resumeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file.fieldname === 'resume' && resumeTypes.includes(file.mimetype)) return cb(null, true);
    if ((file.fieldname === 'featuredImage' || file.fieldname === 'blogImages') && imageTypes.includes(file.mimetype)) return cb(null, true);
    
    return cb(new Error('Invalid file type.'), false);
};

// Multer Upload Middleware
const uploadFiles = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: fileFilter,
}).fields([
    { name: 'resume', maxCount: 1 },
    { name: 'featuredImage', maxCount: 1 },
    { name: 'blogImages', maxCount: 10 }
]);

// Middleware for handling upload errors
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ statusCode: 400, message: `File upload error: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ statusCode: 400, message: err.message });
    }
    next();
};

// Export Upload Middleware
module.exports = { uploadFiles, handleUploadError };
