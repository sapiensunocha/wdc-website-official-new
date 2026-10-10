import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!file.mimetype.includes('image')) {
        return cb(new Error('Invalid image format'));
    }
    cb(null, true);
};

const cvFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowed.includes(file.mimetype)) {
        return cb(new Error('Only PDF, DOC, and DOCX files are accepted'));
    }
    cb(null, true);
};

export default multer({ storage: multer.diskStorage({}), fileFilter: imageFilter });

export const multerCV = multer({
    storage: multer.memoryStorage(),
    fileFilter: cvFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
