import { Router } from "express";
import {upload} from "../middleware/upload.middleware";
import {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
} from "../controllers/song.controller";

const router = Router();

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/', upload.single("audio"), createSong);
router.patch('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;