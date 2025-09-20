import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create a subdirectory based on file type
        let subfolder = 'others';
        if (file.mimetype.startsWith('image/')) {
            subfolder = 'images';
        } else if (file.mimetype.startsWith('video/')) {
            subfolder = 'videos';
        } else if (file.mimetype.startsWith('application/')) {
            subfolder = 'documents';
        }
        
        const dir = path.join(uploadPath, subfolder);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    }
});

// File type validation
const fileFilter = (req, file, cb) => {
    // Accept images
    const imageTypes = /jpeg|jpg|png|webp|gif/;
    // Accept documents
    const documentTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;
    // Accept videos
    const videoTypes = /mp4|webm|ogg|mov/;
    
    const extname = path.extname(file.originalname).toLowerCase();
    
    if (file.mimetype.startsWith('image/') && imageTypes.test(extname)) {
        return cb(null, true);
    } else if (file.mimetype.startsWith('video/') && videoTypes.test(extname)) {
        return cb(null, true);
    } else if (file.mimetype.startsWith('application/') && documentTypes.test(extname)) {
        return cb(null, true);
    }
    
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only images, videos, and documents are allowed.`), false);
};

// Single file upload
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB max file size
});

// Multiple file uploads with field configuration
const uploadMultiple = (fields) => {
    return multer({
        storage,
        fileFilter,
        limits: { fileSize: 100 * 1024 * 1024 } // 100MB max file size
    }).fields(fields);
};

// Export both single and multiple upload functions
export { upload, uploadMultiple };

export default upload;
