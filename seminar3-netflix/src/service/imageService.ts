import { PrismaClient } from "@prisma/client";
import { ImageCreateResponseDTO } from "../interfaces/image/ImageCreateResponseDTO";

const prisma = new PrismaClient();

//* 이미지 업로드
const uploadImage = async (location: string): Promise<ImageCreateResponseDTO> => {
    const data = await prisma.image.create({
        data: {
            image: location,
        },
    });
    
    const result: ImageCreateResponseDTO = {
        id: data.id,
        image: data.image as string, //[타입 단언] 널로 넘어 올 수도 있어서  
    };

    return result;

};
const uploadImages = async (locations: Array<string>) : Promise<ImageCreateResponseDTO> => {
    const data = await prisma.image.create({
        data:{
            image : String(locations)
        },
    });

    const result: ImageCreateResponseDTO = {
        id: data.id,
        image: data.image as string, //[타입 단언] 널로 넘어 올 수도 있어서  
    };
    console.log(result);
    return result;
}
const imageService = {
    uploadImage,
    uploadImages
}

export default imageService;