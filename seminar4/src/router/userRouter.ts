import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controller";
import { auth } from "../middlewares";
const router: Router = Router();


//* 유저 생성 - POST api/user
router.post(
  "/",
  [body("name").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })],
  userController.createUser
);

router.post(
    "/signin",
    [
      body("email").notEmpty(),
      body("email").isEmail(),
      body("password").notEmpty(),
      body("password").isLength({ min: 6 }),
    ],
    userController.signInUser
  );


//* 전체 유저 조회 ( GET api/user )
router.get("/", userController.getAllUser);

//* 유저 정보 업데이트 ( PATCH api/user/:userId )
router.patch("/:userId",userController.updateUser);

//* 유저 삭제 ( DELETE api/user/:userId )
router.delete("/:userId", userController.deleteUser);

//~ 이름으로 유저 검색 - GET user/search?keyword={}&option={}
//  보통으로는 search라는 라우터를 하나 만든다 
router.get("/search",userController.searchUserByUserName);
// api/user/search?keyword
// api/user/1



router.get("/:userId" ,userController.getUserById);

export default router;
