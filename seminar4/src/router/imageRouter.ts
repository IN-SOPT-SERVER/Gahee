import { Router } from "express";
import { imageController } from "../controller";
import {upload} from "../middlewares";

const router :Router= Router();

//single은 단일 파일 올리기 , array : 여러개의 이미지 올림 
//파일이라는 필드에 이미지를 던져줄거다 
router.post('/',upload.single("file"), imageController.uploadImage);

export default router;
