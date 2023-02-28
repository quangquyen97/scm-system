import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../models/init-models";
import sequelize from "../../models/index";
import { UserAttributes } from "../../models/users";
import { validateSignup } from "./validator";


const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   if(req.method === "POST"){
    let { error } = validateSignup(req.body);

    if (error) {
      console.log(error);
      return res.send(error.details);
    } else {
      let { userName, userEmail, userPassword, userRole } = req.body;
      let data: Omit<UserAttributes, never> = {
        userName,
        userEmail,
        userPassword: bcrypt.hashSync(userPassword, 10),
        id: 0,
        userRole,
      };
      const permissTableByUserRole = await model.Permissions.findOne({
        where: {
          permissionName: userRole,
        },
      });

      let checkEmail = await model.Users.findOne({
        where: {
          userEmail: userEmail,
        },
      });
      if (checkEmail) {
        return failCode(res, checkEmail, "email da ton tai");
      } else if (!checkEmail) {
        await model.Users.create(data);

        let userIdCreteNew = await model.Users.findOne({
          where: {
            userEmail,
          },
        });

        if (userIdCreteNew && permissTableByUserRole) {
          let PerId = permissTableByUserRole.id;
          await model.Roles.create({
            UserId: userIdCreteNew.id,
            PermissionId: PerId,
          });

        }
        return successCode(res, data, "Tao tk thanh cong");
      }
    }
   }else{
    return failCode(res, "", "sai method")
   }
  } catch (error:any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
