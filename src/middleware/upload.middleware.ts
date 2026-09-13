import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import {Request} from "express";
import { text } from "stream/consumers";

const uploadsDir = path.join(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname);
        const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_]/g, "-").toLocaleLowerCase();
        cb(null, `${safeName}-${uniqueSuffix}${text}`);
    },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if(file.mimetype.startsWith('audio/')) {
        cb(null, true);
    }else {
        cb(new Error('Faqat audio fayllarini yuklash mumkin (mp3, wav, va h.k'));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});