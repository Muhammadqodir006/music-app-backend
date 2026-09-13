import {Request, Response, NextFunction} from "express";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);

    if(err.message.includes("audio") || err.message.includes("File too large")) {
        return res.status(400).json({error: err.message});
    }

    res.status(500).json({error: "Serverda kutilmagan xatolik yuz berdi!"});
}