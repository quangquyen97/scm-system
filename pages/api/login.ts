import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../models/init-models";
import sequelize from "../../models/index";
import { errorCode, failCode, successCode } from "../../utils/response";
import * as bcrypt from "bcrypt-ts";
import { decode, encodeToken } from "../../middleware/auth";
import { validateSignin } from "./validator";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === "POST"){
      let { error } = validateSignin(req.body);
    if (error) {
      
      console.log(error);
      return res.send(error)
    } else {
      let { userEmail, userPassword } = req.body;
      const checkUser = await model.Users.findOne({
        where: {
          userEmail,
        },
      });
      console.log(checkUser);
      if (checkUser) {
        let checkPass = bcrypt.compareSync(
          userPassword,
          checkUser.userPassword
        );
        if (checkPass) {
          
          let accessToken = { userEmail, accessToken: encodeToken(checkUser) };
          return successCode(res, accessToken, "Dang Nhap Thanh Cong!");
        } else {
          return failCode(res, "", "mat khau khong dung");
        }
      } else {
        return failCode(res, userEmail, "email khong ton tai");
      }
    }
    }else{
      return failCode(res,"", "sai method")
    }
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
