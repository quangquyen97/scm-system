import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../models/init-models";
import sequelize from "../../models/index";
import { errorCode, failCode, successCode } from "../../utils/response";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest , res: NextApiResponse) {
  try {
   if(req.method === "DELETE"){
    let {id} = req.body

    let checkUser = await model.Users.findByPk(id)
    if(checkUser){
            await model.Users.destroy({where:{
                id
            }})
            return  successCode(res,checkUser,"Xoa user thanh cong")
    }else{
        return failCode(res,"", "user id khong ton tai")
    }
   }
   return failCode(res,'','sai method')
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
