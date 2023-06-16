import { encodeToken } from './../../../middleware/auth';
import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import { errorCode, failCode, successCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";

import { validateSignin } from "../validator";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      let { error } = validateSignin(req.body);
      if (error) {

        return res.send(error);
      } else {
        let { userEmail, userPassword } = req.body;
        const checkUser = await model.Users.findOne({
          where: {
            userEmail
          }
        })
        if (checkUser) {
          let checkPass = bcrypt.compareSync(
            userPassword,
            checkUser.userPassword
          );

          if (checkPass) {
            let userInfor = {
              userFirstName: checkUser.userFirstName,
              userEmail,
              accessToken: encodeToken(checkUser),
            };

            return successCode(res, userInfor, "Login accepted!");
          } else {
            return failCode(res, "", "Your password is not correct");
          }
        } else {
          return failCode(res, userEmail, "Invalid email!!!");
        }
      }
    } else {
      return failCode(res, "", "Wrong method");
    }
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
