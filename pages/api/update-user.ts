import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../models/init-models";
import sequelize from "../../models/index";
import { errorCode, failCode, successCode } from "../../utils/response";
import * as bcrypt from "bcrypt-ts";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "PUT") {
      let { userName, userPassword, userRole, id } = req.body;

      let checkUser = await model.Users.findByPk(id);
      if (checkUser) {
        let userUpdate = {
          userName,
          userPassword: bcrypt.hashSync(userPassword, 10),
          userRole,
        };
        await model.Users.update(userUpdate, {
          where: {
            id: id,
          },
        });
        return successCode(res, userUpdate, "cap Nhat thanh cong");
      } else {
        return failCode(res, "", "user id khong ton tai");
      }
    }
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
