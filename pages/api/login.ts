import { NextApiRequest, NextApiResponse } from 'next';
import init_models from '../../models/init-models'
import sequelize from '../../models/index'
import { errorCode, failCode, successCode} from '../../utils/response'
import * as bcrypt from 'bcrypt-ts';
import { encodeToken } from '../../middleware/auth';

const model = init_models(sequelize);

export default async function login  (req:NextApiRequest, res: NextApiResponse){

  try {
      let {userEmail, userPassword} = req.body;
      const checkUser = await model.Users.findOne({
       where:{
         userEmail
       }
      })
      console.log(checkUser)
      if(checkUser){
        let checkPass = bcrypt.compareSync(userPassword,checkUser.userPassword);
        console.log(bcrypt.compareSync(userPassword,checkUser.userPassword),'check')
        if(checkPass){
          let accessToken = {userEmail, accessToken:encodeToken(checkUser)};
          successCode(res,accessToken,'Dang Nhap Thanh Cong!')
        }else{
          failCode(res, '',"mat khau khong dung")
        }
      }else{
        failCode(res,userEmail,"email khong ton tai")
      }
  } catch (error: any) {
    errorCode( error, 'lỗi 500')
  }
  }
  