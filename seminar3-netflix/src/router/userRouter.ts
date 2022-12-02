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
export default router;
