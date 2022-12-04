export interface ContentsCreateDTO{
    title: string;
    isOriginal: boolean;
    releasedDate: string;
    ageLimit: number;
    episodeCount: number;
    actors: string;
    genres: string; 
    isLiked: boolean;
    isHave: boolean;
}