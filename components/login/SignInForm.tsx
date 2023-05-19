import React from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import swal from "sweetalert";
// import { trpc } from "../../middleware/trpc";

export default function LoginForm() {

  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);
  const [formLogin, setFormLogin] = React.useState({
    userEmail: "",
    userPassword: "",
  });
  const [err, setErr] = React.useState({ message: "" });
  const formSignUpFecth = async (data: object) => {
    try {
      let result = await axios.post("/api/userApi/login", data);

      if (result.status === 200) {
        Router.reload();
        let userToken: string = JSON.stringify(result.data.content.accessToken);
        let userInfo: string  =JSON.stringify(result.data.content.userFirstName);
        localStorage.setItem("userToken", userToken);
        localStorage.setItem("userName", userInfo);
        document.cookie = `USER_LOGIN=${userToken}`;
        swal({
          title: `Welcome back! ${result.data?.content.userFirstName}`,
          text: "You clicked the button!",
          icon: "success",
        });
      }
    } catch (err: any) {
      setErr({ message: err.response.data.message });
    }
  };

  return (
    <>
      <div className="m-auto h-screen ">
        <div
          className="flex justify-center shadow-2xl bg-white"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            background: '#FFFFFF',
            boxShadow:" 0px 8px 32px 16px rgba(68, 170, 238, 0.19)",
            borderRadius: "8px",
            transform: "translate(-50%,-50%)",
            overflow:'hidden'
          }}
        >
          <div className="side-board" style={{height:'761px',width:'474px',background:'#0A5F59',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h2 style={{textAlign:'center',color:'#DFEBE9',fontSize:'40px',fontWeight:'800',lineHeight:'55px',paddingBottom:'150px'}}>Supply Chain Management</h2>
          </div>
          <div
            className=""
            style={{
              borderRadius: "5px",
              padding: "20px 40px",
              width: "fit-content",

            }}
          >
            <div className="w-full max-w-md space-y-6 h-full  flex justify-center align-items-center flex-column" style={{paddingBottom:'120px'}}>
              <div>
                <h1
                  className="mt-6 text-center "
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 800,
                    fontSize: "50px",
                    lineHeight: "30px",
                    color: "#0A5F59",
                  }}
                >
                  LOGIN
                </h1>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="mt-8 space-y-6"
                action="#"
                method="POST"
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px">
                  <div className="py-3">
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email-address"
                      name="userEmail"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => {
                        setFormLogin({
                          ...formLogin,
                          userEmail: e.target.value,
                        });
                        console.log(formLogin);
                      }}
                      required
                      className="relative block placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm shadow-sm"
                      placeholder="Email"
                      style={{ borderRadius: 4, width: 420 }}
                    />
                  </div>
                  <div className="py-3 m-0 showPassWord">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="userPassword"
                      onChange={(e) => {
                        setFormLogin({
                          ...formLogin,
                          userPassword: e.target.value,
                        });
                      }}
                      type={isPasswordViewed ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm  shadow-sm"
                      placeholder="Password"
                      style={{ borderRadius: 4, width: 420 }}
                    />
                    <span style={{top:"50%"}}>
                      <img 
                        id="on"
                        onClick={() => {
                          setIsPasswordViewed(!isPasswordViewed);
                        }}
                        src={
                          isPasswordViewed
                            ? "show-pass.svg"
                            : "no-show-pass.svg"
                        }
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 aEffect">
                        Save Password?
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        href="/password-reset"
                        className="aEffect ml-2 block"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btnEffect group  flex w-full justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      padding: "10px 182px",
                    }}
                    onClick={() => {
                      formSignUpFecth(formLogin);
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="text-center"></div>
            </div>
          </div>
        </div>
        <div className={err.message == '' ? 'd-none': `alert alert-danger`} role="alert">
        {err.message == '' ? '': `Uncorrect information :  ${err.message}`}
        </div>
      </div>
    </>
  );
}
