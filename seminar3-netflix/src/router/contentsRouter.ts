import { Router } from "express";
import {contentsController} from "../controller";
const router: Router = Router();

//* 전체 컨텐츠 보기 - GET api/contents
router.get("/",contentsController.getAllContents);

//* 오리지널 서비스인 것만 보기 - GET api/contents/original-series
router.get("/original-series",contentsController.getOriginalSeries);

// * 컨텐츠 생성하기 - POST api/contents
router.post("/",contentsController.createContents);


//* 컨텐츠 삭제하기 - DELETE api/contents/:contentId
router.delete("/:contentId",contentsController.deleteContents);

//* 좋아요 없데이트 - UPDATE api/contents/:contentId
router.patch("/:contentId",contentsController.updateLike);


export default router;
