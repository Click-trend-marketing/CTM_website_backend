const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directory for storing resumes
const uploadDir = path.join(__dirname, '../uploads/resumes');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Directory to store resumes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // Preserve the original file extension
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

// File filter to accept certain file formats (PDF, DOC, DOCX, TXT)
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain', // Allows .txt files if needed
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed.'), false);
    }
};

// Initialize multer with the defined configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size of 5MB
    fileFilter: fileFilter,
}).single('resume'); // 'resume' is the field name in the form

// Middleware to handle file upload errors
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer-specific errors (e.g., file size limit exceeded)
        return res.status(400).json({
            statusCode: 400,
            message: `File upload error: ${err.message}`,
        });
    } else if (err) {
        // Other errors (e.g., invalid file type)
        return res.status(400).json({
            statusCode: 400,
            message: `Invalid file type: ${err.message}`,
        });
    }
    next(); // If no error, move to the next middleware
};

module.exports = { upload, handleUploadError };
