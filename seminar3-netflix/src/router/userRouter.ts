import { Router } from "express";
import { body } from "express-validator";
import {userController} from "../controller";
import { auth } from "../middleware";
const router: Router = Router();

//유저 생성 
router.post(
    "/",
    [body("name").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })],
    userController.createUser
  );
//조회 
router.get("/",auth,userController.getUser);

router.post(
  "/signin",
  auth,
  [
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  userController.signInUser
);

//~ 이름으로 유저 검색 - GET api/user/search?keyword={}&option={}
// 보통으로는 search 라우터 만든다
router.get("/search",userController.searchUserByName);

router.get("/:userId",userController.getUserById);



export default router;
