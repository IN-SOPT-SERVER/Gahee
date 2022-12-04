import { success, fail } from './../constants/response';
import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { imageService } from "../service";



//* 이미지 업로드 API
const uploadImage = async (req:Request, res:Response) => {
    const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
    const { location } = image; //이미지 객체 url
    //이미지 이름 image.filename

    if (!location){
        res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.NO_IMAGE))
    }

    const data = await imageService.uploadImage(location);

    if (!data){
        res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.CREATE_IMAGE_FAIL))
    }
   
   return res.status(sc.CREATED).send(success(sc.CREATED,rm.CREATE_IMAGE_SUCCESS,data))
    
};

const uploadImages = async (req:Request, res:Response) => {
    const image:Express.MulterS3.File[]= req.files as Express.MulterS3.File[] ;
    const locations = image?.map(img=>img.location);
 
    if (!locations){
        res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE))
    }

    const data = await imageService.uploadImages(locations);

    if (!data){
        res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST,rm.CREATE_IMAGE_FAIL))
    }
    return res.status(sc.CREATED).send(success(sc.CREATED,rm.CREATE_IMAGE_SUCCESS,data))

};


const imageController = {
    uploadImage,
    uploadImages,
};
export default imageController;
