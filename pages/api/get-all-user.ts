import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../models/init-models";
import sequelize from "../../models/index";
import { errorCode, failCode, successCode } from "../../utils/response";
import * as bcrypt from "bcrypt-ts";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
     let data =    await model.Users.findAll({
            include:[{
                model: model.Roles,
                as: "Roles",
            }]
        })
        successCode(res,data,"Lay danh sach thanh cong")
    }else{
        failCode(res,"","sai method")
    }
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
