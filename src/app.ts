import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import songRoutes from "./routes/song.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, "..", "uploads")));

app.use('/api/songs', songRoutes);

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`server ${PORT}-portda ishga tushdi`);
});