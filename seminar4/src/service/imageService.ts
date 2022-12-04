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

const imageService = {
    uploadImage
}

export default imageService;