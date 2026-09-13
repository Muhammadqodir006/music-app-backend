export interface CreateSongDto {
    title: string;
    artist: string;
    lyrics?: string;
    duration?: string;
}

export interface UpdateSongDto {
    title?: string;
    artist?: string;
    lyrics?: string;
    duration?: string;
}