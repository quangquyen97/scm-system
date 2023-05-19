import jwt from "jsonwebtoken";
import configToken from "../config/index";

export const encodeToken = (data: string | object) => {
    const token = jwt.sign({ data }, "SCMSystem", { expiresIn: "2h" });
    // console.log(token)
    return token;
  };
  export const refreshToken = (data: string | object) => {
    const refreshTokenUser = jwt.sign(data, configToken.SECRET_REFRESH, {
      expiresIn: configToken.refreshTokenLife,
    });
    console.log(refreshTokenUser, "refreshTokenUser");
    return refreshTokenUser;
  };