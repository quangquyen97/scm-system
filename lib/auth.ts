


import {jwtVerify} from 'jose'
import jwt from 'jsonwebtoken'
interface UserJwtPayload{
  jti:string,
  iat:number
}



export const getJwtSecretKey = () =>{
  const secret = process.env.JWT_SECRET_KEY
  if(!secret || secret.length === 0){
    throw new Error('The environment variable JWT_SECRET_KEY is not set.')
  }
  return secret
}
export const verifyAuth = async (token: string) => {
 try {
  const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
  return verified.payload as UserJwtPayload
 } catch (error) {
  throw new Error("Your token has expried.")
 }

  // if (verified) {
  //   return true;
  // } else {
  //   return false;
  // }
};

export const decode = (token: string) => {
  return jwt.decode(token);
};

export const kiemTraToken =  async(
  req: { headers: { accessToken: string } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: string): void; new (): any };
    };
  },
  next: () => void
) => {
  let { accessToken } = req.headers;
  // console.log(accessToken)
  try {
    if (await verifyAuth(accessToken)) {
      next();
    }
  } catch (error) {
    res.status(401).send("token khong hop le");
  }
};