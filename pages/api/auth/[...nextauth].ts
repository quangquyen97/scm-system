import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import * as bcrypt from "bcrypt-ts";
import { encodeToken } from "../../../middleware/auth";
import { failCode, successCode } from "../../../utils/response";

const model = init_models(sequelize);

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { userEmail, userPassword } = credentials as {
          userEmail: string;
          userPassword: string;
        };
        // perform you login logic
        // find out user from db
        const checkUser = await model.Users.findOne({
          where: {
            userEmail
          }
        })
        if (checkUser) {
          const checkPass =  bcrypt.compareSync(
            userPassword,
            checkUser.userPassword
          );
          console.log(checkPass,'check')
          if (checkPass) {
            let userInfor = {
              userFirstName: checkUser.userFirstName,
              userEmail,
              accessToken: encodeToken(checkUser),
            };
            return {
              userInfor
            };
        }
        if (!checkUser  || !checkPass) {
          throw new Error("invalid credentials");
        }
        
      }

        // if everything is fine
    
      },
    }),
  ],
  pages: {
    signIn: "/userApi/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
};

export default NextAuth(authOptions);