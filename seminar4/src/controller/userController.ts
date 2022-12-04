import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { UserCreateDTO } from "../interfaces/UserCreateDTO";
import { UserSignInDTO } from "../interfaces/UserSignInDTO";

import jwtHandler from "../modules/jwtHandler";
import { userService } from "../service";




//* 유저 생성
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
    name: data.userName,
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



//* 유저 전체 조회
const getAllUser = async (req: Request, res: Response) => {
  const {page, limit} = req.query;
  const data = await userService.getAllUser(Number(page),Number(limit) )
  return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", data });
  
};

//유저 정보 조회
// const getAllUser = async (req: Request, res: Response) => {
 
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
//   }
//   const data = await userService.getAllUser();
//   return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", data });
// };

//* 유저 정보 업데이트
const updateUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId } = req.params;
  if (!name) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));

  const updateUser = await userService.updateUser(+userId, name);
  return res.status(200).json({ status: 200, message: "유저 전체 조회 성공", updateUser });

};


//* 유저 삭제

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userService.deleteUser(+userId);
  return res.status(200).json({ status: 200, message: "유저 삭제 성공"});
};

//* 유저 조회
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};


//* GET ~/user?keyword=가희
const searchUserByUserName = async(req: Request, res: Response) =>{
  const { keyword,option} = req.query ; // keyword = 가희

  const data = await userService.searchUserByName(keyword as string,option as string);

  if (!data){
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SEARCH_USER_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.SEARCH_USER_SUCCESS, data));

}



const userController = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  signInUser,
  searchUserByUserName
};

export default userController;