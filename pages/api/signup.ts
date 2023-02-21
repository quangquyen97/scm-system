import { NextApiRequest, NextApiResponse } from 'next';
import {failCode,successCode,errorCode} from '../../utils/response'
import * as bcrypt from 'bcrypt-ts';
import initModels from '../../models/init-models';
import sequelize from '../../models/index'
import { UserAttributes } from '../../models/users';

const model = initModels(sequelize);

interface T{
    res: NextApiResponse,
    req: NextApiRequest
}
export default async function signup(req: NextApiRequest, res: NextApiResponse ) {
    try {
        let { userName, userEmail, userPassword,userRole} = req.body;
        let data :Omit<UserAttributes, never> = {
            userName, userEmail, userPassword: bcrypt.hashSync(userPassword, 10),
            id: 0,
            userRole
        } 
        console.log(userName, userEmail, userPassword)
    if(userEmail && userPassword && userName ){
        let checkEmail = await model.Users.findOne({
            where: {
                userEmail: userEmail
            }
        })
        console.log(checkEmail,'eee')
        if(checkEmail){
           return failCode(res, checkEmail, 'email da ton tai')
        }else{
             await model.Users.create(data)
             console.log('aaa')
             return  successCode(res,data, 'Tao tk thanh cong')
        }
    }else{
        return res.send('Khong duoc de trong thong tin')
    }

   } catch (error) {
       console.log(error)
    return errorCode(res, 'Dang ky khong thanh cong')
   }
    
}