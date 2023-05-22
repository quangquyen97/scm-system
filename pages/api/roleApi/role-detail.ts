import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
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
      // let { id } = req.body;
      // console.log(id,'body')
      // let data = await model.Roles.findAll({
      //   where: {
      //     id,
      //   },
      // });
      let {id}= req.body;
      let arrId = id.split(',')
      let data: any= []
     console.log(arrId.length)
     if(  arrId.length > 1){
      for(let i = 0; i < arrId.length ; i++){
        data.push( await model.Roles.findAll({where:{
          id:arrId[i]
        }}))
    }
    }
    else{
      data = await model.Roles.findAll({where:{
        id
      }})
     }
      console.log(data,'data')
      successCode(res, data, "Roles detail");
    } else if (req.method === "POST") {
      let { userRole } = req.body;

      let data: any = []
      for (let i = 0; i <= userRole.length; i++) {
        console.log(userRole[i], 'userRole[i]')
        await model.Users.findAll({
          where: {
            userRole: userRole[i],
          },
        })
          .then((result) => {
            console.log(data, 'on for')

            return data.push(result.map(e => e.dataValues))
          })
          .catch((err: any) => {
            console.log(err);
          });

      }
      console.log(data, 'on for')

      successCode(res, data, "tim thanh cong");

    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Delete unsuccess");
  }
}