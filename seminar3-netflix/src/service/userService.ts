import { UserCreateDTO } from '../interfaces/common/UserCreateDTO';
import { PrismaClient } from "@prisma/client";
import { sc } from "../constants";
import bcrypt from "bcryptjs";
import { UserSignInDTO } from '../interfaces/common/UserSignInDTO';

const prisma = new PrismaClient();

const createUser = async (userCreateDto: UserCreateDTO) => {
    //? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
    const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
    const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화
  
    const data = await prisma.user.create({
      data: {
        name: userCreateDto?.name,
        age: userCreateDto?.age,
        email: userCreateDto.email,
        password,
      },
    });
    return data;
  }

  const signIn = async (userSignInDto: UserSignInDTO) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: userSignInDto.email,
        },
      });
      if (!user) return null;
  
      //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
      //? match false시 401을 리턴
      const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
      if (!isMatch) return sc.UNAUTHORIZED;
  
      return user.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
const getUser = async() => {
    return await prisma.user.findMany();
}

const getUserById =async (userId:number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

//* - 이름으로 유저 조회 (query) , 키워드를 포함한 것 들 return
const searchUserByName = async (keyword: string, option: string)=> {
  //?유저 선착순 
  if ( option === "desc"){
    const data = await prisma.user.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return data;
  }
  
  //유저 오래된 순 
  if ( option === "asc"){
    const data = await prisma.user.findMany({
      where:{
        name: {
          contains: keyword,
        },
      },
    orderBy: {
      createdAt : 'asc'
    }
  });
  return data
  }

  //? 이름을 오름 차순으로 정렬
  if ( option === "nameDesc"){
    const data = await prisma.user.findMany({
      where: {
        name: {
          contains: keyword
        }
      },
      orderBy: {
        name : 'desc',
      }
    });
    return data;
  }
}

const userService = {
    createUser,
    getUser,
    signIn,
    getUserById,
    searchUserByName,
}

export default userService;