import { UserCreateDTO } from './../interfaces/common/UserCreateDTO';
import { Request, Response } from "express";
import { userService } from "../service";
import { fail, success } from '../constants/response';
import { rm, sc } from '../constants';
import { validationResult } from 'express-validator';
import jwtHandler from '../modules/jwtHandler';
import { UserSignInDTO } from '../interfaces/common/UserSignInDTO';


const createUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userCreateDto: UserCreateDTO = req.body;
  const data = await userService.createUser(userCreateDto);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SIGNUP_FAIL));
  }

  // ================== 여기 추가 ========================
  //? 아까 만든 jwtHandler 내 sign 함수를 이용해 accessToken 생성
  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.name,
    accessToken,
  };

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));
};


//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDTO = req.body;

  try {
    const userId = await userService.signIn(userSignInDto);

    if (!userId) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
    else if (userId === sc.UNAUTHORIZED)
      return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(userId);

    const result = {
      id: userId,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};



const getUser = async(req:Request, res:Response) =>{
    const data = await userService.getUser();
    return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", data });
}



const userController = {
    createUser,
    getUser,
    signInUser
}
export default userController;