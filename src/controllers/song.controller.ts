import {Request, Response} from "express";
import path from "path";
import fs from "fs";
import prisma from "../config/db";
import { CreateSongDto, UpdateSongDto } from "../types/song.types";


export async function getAllSongs(_req: Request, res: Response) {
    const songs = await prisma.song.findMany({
        orderBy: { createdAt: "desc"},
    });
    res.json(songs);
} 

export async function getSongById(req: Request, res: Response) {
    const {id} = req.params;

    const song = await prisma.song.findUnique({ where: {id}});

    if(!song) {
        return res.status(404).json({error: "Qo\'shiq topilmadi"});
    }

    res.json(song);
}

export async function createSong(req: Request, res: Response) {
    const {title, artist, lyrics, duration} = req.body as CreateSongDto;
    const file = req.file;

    if(!file) {
        return res.status(400).json({error: "Audio fayl talab qilinadi"});
    }

    if(!title || !artist) {
        return res.status(400).json({error: "title va artist maydonlari majburiy"});
    }

    const song = await prisma.song.create({
        data: {
            title,
            artist,
            lyrics: lyrics || null,
            duration: duration ? Number(duration) : null,
            fileUrl: `/uploads/${file.fieldname}`,
        },
    });

    res.status(201).json(song);
}

export async function updateSong(req: Request, res: Response) {
    const {id} = req.params;
    const {title, artist, lyrics, duration } = req.body as UpdateSongDto;

    const existing = await prisma.song.findUnique({ where: {id}});
    if(!existing) {
        return res.status(404).json({error: "Qo\'shiq topilmadi"});
    }

    const updated = await prisma.song.update({
        where: { id},
        data: {
            ...(title !== undefined && {title}),
            ...(artist !== undefined && {artist}),
            ...(lyrics !== undefined && {lyrics}),
            ...(duration !== undefined && {duration: Number(duration)}),
        },
    });

    res.json(updated);
}

export async function deleteSong(req: Request, res: Response) {
    const {id} = req.params;

    const song = await prisma.song.findUnique({
        where: {id},
    });
    if(!song) {
        return res.status(404).json({error: "Qo\'shiq topilmadi"});
    }

    await prisma.song.delete({where: {id}});

    const filePath = path.join(__dirname, "..", "..", song.fileUrl);
    fs.unlink(filePath, (err) => {
        if (err) console.error("faylni o\'chirishda xatolik: ", err.message);
    });

    res.status(204).send();
}