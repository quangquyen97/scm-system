import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getAllRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "PUT") {
      let {id}= req.body;
      // console.log(req,'body')
      let data = await model.Roles.findAll({
        where: {
          id
        },
        
      });
      successCode(res, data, "Role detail");
    }else if (req.method === "POST") {
      let { userRole } = req.body;
      let findUserByType = await model.Users.findAll({
        where: {
          userRole,
        },
      });
     
      if (findUserByType.length >0) {
      
        successCode(res, findUserByType, "tim thanh cong");
      }
      else{
        successCode(res,'','No data record')
      }
      
    }  else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Delete unsuccess");
  }
}
