// src/middlewares/upload.ts

import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config";
import s3 from "../config/s3Config";

//? 미들웨어로 사용할 multer 모듈
const upload = multer({
  //? 실질적인 storage 는 multerS3 이용해 aws s3 로 설정
  //어떤 설정 값을 갖고 s3를 설정 할 것인지! 
  storage: multerS3({
    s3: s3, //s3객체를 갖고 와달라 -> 이미 s3Congfig에서 만들었음 
    bucket: config.bucketName, //? s3 bucket name 지정  
    //이거 빼면 s3에서 이미지를 누르면 새탭에서 보여지는 게 아니라 다운로드가 된다, 
    contentType: multerS3.AUTO_CONTENT_TYPE, //? mimetype 은 자동으로 설정 (이미지, jpg,png파일들의 타입을 자동으로 설정 해준다. )
    acl: "public-read", //Access  control for the file

    //? key는 파일 이름을 지정. 버킷 내 같은 이름의 파일은 같은 파일로 인식하기 때문에 Unique하도록!
    key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

export default upload;
