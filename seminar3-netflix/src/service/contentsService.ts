import { ContentsCreateDTO } from '../interfaces/common/ContentsCreateDTO';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//모든 시리즈 갖고오기 
const getAllContents = async() => {
    const data = await prisma.movie.findMany();
    return data;
}

//오리지널 시리즈만 갖고오기 
const getOriginalSeries = async() => {
    const data = await prisma.movie.findMany({
        where: {
         isOriginal:{
            equals: true,
         },
    }
    });
    return data;
}

//콘텐츠 생성 
const createContents = async(contentsCreateDto:ContentsCreateDTO) => {
    const data = await prisma.movie.create({
        data:{   
            title : contentsCreateDto.title,
            isOriginal : contentsCreateDto.isOriginal,
            releasedDate : contentsCreateDto.releasedDate,
            ageLimit :contentsCreateDto.ageLimit,
            episodeCount : contentsCreateDto.episodeCount,
            actors :contentsCreateDto.actors,
            genres : contentsCreateDto.genres,
            isLiked  : contentsCreateDto.isLiked,
            isHave : contentsCreateDto.isHave
        }
    })
    return data;
}

const deleteContents = async(contentId : number) => {
  await  prisma.movie.delete({
        where:{
            id:contentId
        }
    });
}

//좋아요 없데이트 , 
const updateLike = async(contentId : number ) => {
    const pastLikeStatus = await prisma.movie.findUnique({
        where:{
            id:contentId
        }
    })
    const data = await prisma.movie.update({
        where:{
            id: contentId
        },
        data:{
            isLiked: !pastLikeStatus?.isLiked
        }
    });
    return data;
}


const contentsService = {
    getAllContents,
    getOriginalSeries,
    createContents,
    deleteContents,
    updateLike
}

export default contentsService;