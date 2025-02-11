import React, { Fragment, useState } from "react";
import axios from "axios";
import { object, string, array, number, date } from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect } from "react";
import { Label } from "flowbite-react";
import swal from "sweetalert";
import { decode } from "../../../middleware/auth";
const animatedComponents = makeAnimated();
const RolePermOption = [
  { value: "perUser_view", label: "USER_VIEW" },
  { value: "perUser_add", label: "USER_ADD" },
  { value: "perUser_edit", label: "USER_EDIT" },
  { value: "perUser_delete", label: "USER_DELETE" },
  { value: "perScopes_view", label: "SCOPES_VIEW" },
  { value: "perScopes_add", label: "SCOPES_ADD" },
  { value: "perScopes_edit", label: "SCOPES_EDIT" },
  { value: "perScopes_delete", label: "SCOPES_DELETE" },
  { value: "perMaterial_view", label: "MATERIAL_VIEW" },
  { value: "perMaterial_add", label: "MATERIAL_ADD" },
  { value: "perMaterial_edit", label: "MATERIAL_EDIT" },
  { value: "perMaterial_delete", label: "MATERIAL_DELETE" },
];
const roleScopesOption = [
  { value: "own", label: "OWN" },
  { value: "point", label: "POINT" },
  { value: "type", label: "TYPE" },
  { value: "all", label: "ALL" },
];

function AdminTemplate() {
  const [users, setUsers] = React.useState([]);
  const [userDetail, setUserDetail] = React.useState({
    relatedType: 1,
    relatedUser: 2,
    userAdress: "",
    userDob: "",
    userEmail: "",
    userFirstName: "",
    userLastName: "",
    userPhoneNumber: "",
    userRole: "",
    userType: "",
  });
  const [relaType, setRelaType] = React.useState({ relaType: [] });
  const [relaUser, setRelaUser] = React.useState({ relaUser: [] });
  const [formSignup, setFormSignUp] = React.useState({
    userType: 0,
    userEmail: "",
    userPassword: "",
    userRole: 0,
    userPhoneNumber: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: [""],
    relatedType: [""],
  });
  const handleChangeChecked = (e: any) => {
    console.log(e.target.name, "eee");

    if (e.target.name === "relaType") {
      if (e.target.checked) {
        setFormSignUp({
          ...formSignup,
          relatedType: [...formSignup.relatedType, e.target.value],
        });
        console.log(formSignup, "relatye");
      } else {
        setFormSignUp({
          ...formSignup,
          relatedType: formSignup.relatedType.filter(
            (obj: any) => obj !== e.target.value || obj === ""
          ),
        });
        console.log(formSignup, "relatye");
      }
    } else if (e.target.name === "relaUser") {
      if (e.target.checked) {
        setFormSignUp({
          ...formSignup,
          relatedUser: [...formSignup.relatedUser, e.target.value],
        });
        console.log(formSignup, "relatye");
      } else {
        setFormSignUp({
          ...formSignup,
          relatedUser: formSignup.relatedUser.filter(
            (obj: any) => obj !== e.target.value || obj === ""
          ),
        });
        console.log(formSignup, "relatye");
      }
    }
  };
  const getAllUser = async () => {
    const { data: res } = await axios.get("/api/userApi/get-all-user");
    setUsers(res.content);
    console.log(res.content);
  };
  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);
  const [isPasswordViewed2, setIsPasswordViewed2] = React.useState(false);

  const [formUpdate, setformUpdate] = React.useState({
    userType: 0,
    userEmail: "",
    userPassword: "",
    userRole: 0,
    userPhoneNumber: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: "",
    relatedType: "",
  });

  const handleOnchange = (e: any) => {
    let { name } = e.target;
    setformUpdate({ ...formUpdate, [name]: e.target.value });
    console.log(formUpdate, "update111111111111");
  };
  const handleOnChangeSignup = (e: any) => {
    let { name } = e.target;
    setFormSignUp({ ...formSignup, [name]: e.target.value });
    setConfirmPass({ ...confirmPass, [name]: e.target.value });
    console.log(formSignup, "form");
  };
  const [isError, setIsError] = React.useState(false);
  const [search, setSearch] = React.useState("");
  console.log(search);
  const [roles, setRoles] = React.useState([]);
  const [roleDetail, setRoleDetail] = React.useState([]);
  const [rol, setRol]: any[] = React.useState([""]);
  let userInfo = {
    userDayOfBirth: "",
    userFirstName: "",
    userLastName: "",
    confirmPassword: "",
  };

  const [confirmPass, setConfirmPass] = React.useState({
    confirmPassword: "",
  });
  const [typeDetail, setTypeDetail] = React.useState({
    typeName: "",
    typeDescription: "",
    typeLevel: "",
  });
  const schema = object({
    userRole: string().required(),
    userEmail: string().required().email(),
    userPassword: string().required(),
    confirmPassword: string()
      .required()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/
      ),
    userDayOfBirth: date(),
    userFirstName: string().required().min(2).max(12),
    userLasName: string().required().min(2).max(50),
  });
  let pointArr = [{ point: "point" }];
  const getUserDetail = async (id: object) => {
    let result = await axios.post("/api/userApi/get-all-user", id);
    console.log(result.data);
    setUserDetail(result.data.content.dataUsers);
    setRoles(result.data.content.roleData[0].rolePermission.split(","));
    setRoleDetail(result.data.content.roleData[0].roleDescription);
    console.log(result.data.content.roleData[0].roleDescription, "dataNeew");
  };
  const getTypeDetail = async (id: any) => {
    await axios
      .put("/api/typeApi/type-detail", id)
      .then((result) => {
        console.log(result, "getTypeDetail");
        setTypeDetail(result.data.content[0]);
        console.log(result.data.content[0], "id");
      })
      .catch((err) => {
        console.log(err, "ees");
      });
  };
  const getRoleDetail = async (id: any) => {
    await axios
      .put("/api/roleApi/role-detail", id)
      .then((result) => {
        console.log(result, "getTypeDetail");
        setRol(result.data.content[0].roleScopes.split(","));
      })
      .catch((err) => {
        console.log(err, "ees");
      });
  };
  const delUser = async (id: object) => {
    await axios
      .delete("/api/userApi/delete-user", id)
      .then((result) => {
        getAllUser();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const editUser = async (data: object) => {
    await axios
      .put("api/update/update-user", data)
      .then((result) => {
        console.log(result);
        swal({
          title: "Update User success!!",
          text: `${result}`,
          icon: "success",
        });
        getAllUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formCreateUserFetch = async (data: object) => {
    try {
      await axios
        .post("/api/userApi/signup", data)
        .then((result) => {
          swal({
            title: "Create New User success!!",
            text: `CONGRATULATION`,
            icon: "success",
          });
          getAllUser();
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const [role, setRole] = React.useState([]);
  const getRole = async () => {
    await axios
      .get("/api/roleApi/get-all-role")
      .then((result) => {
        setRole(result.data.content);
        console.log(result, "role result");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [type, setType] = React.useState([]);
  const getType = async () => {
    await axios
      .get("/api/typeApi/get-all-type")
      .then((result) => {
        setType(result.data.content);
        console.log(result, "type result");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const typeOptionEdit = [
    type?.map((type: any, index: number) => {
      return { value: `${type.id}`, label: `${type.typeName}` };
    }),
  ];

  // const rolesOption:any = [{value: roles.map((item) => item),label:roles.map((item) =>  item )}]

  const [sort, setSort] = useState("ASC");
  const sorting = (col: any) => {
    if (sort === "ASC") {
      const sorted = [...users].sort((a: string, b: string) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setSort("DSC");
    }
    if (sort === "DSC") {
      const sorted = [...users].sort((a: string, b: string) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setSort("ASC");
    }
  };

  const [userRoleDetail, setUserRoleDetail] = React.useState([]);

  const getUserRoleDetail = async (id: object) => {
    await axios
      .post(`/api/userApi/get-all-user`, id)
      .then((result) => {
        setUserRoleDetail(result.data.content.roleData[0].roleScopes);
        console.log(result.data.content.roleData[0].roleScopes.split(","));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const tryRole = [
    role?.map((rol: any, index: number) => {
      index = rol.id;

      return rol.roleScopes;
    }),
  ];

  //  const roleOptionEdit = [
  //     role?.map((rol: any, index: number) => {
  //      rol.roleScopes?.filter((roleScopes:any) =>  roleScopes.includes(userRoleDetail)).map((scope:any) => {
  //        return { value: `${rol.id}`, label: `${rol.roleName}` };
  //      })
  //      0;
  //     }),
  //   ];
  const roleOptionEdit = [
    // role?.filter((obj:any) => {
    //   console.log(userRoleDetail)
    //  obj.roleScopes.includes(userRoleDetail).map((rol:any)=> { return { value: `${rol.id}`, label: `${rol.roleName}` };})}).
    role
      ?.filter((rol: any) => rol.roleScopes.includes(userRoleDetail))
      .map((obj: any) => {
        return { value: obj.id, label: obj.roleName };
      }),
  ];

  console.log(roleOptionEdit);
  // const roleOptionEdit = [
  //   role?.map((rol: any, index: number) => {
  //     if(rol.roleScopes.includes(userRoleDetail)){
  //       return { value: `${rol.id}`, label: `${rol.roleName}` };
  //     }
  //     return { value: `0`, label: `0` };
  //   }),
  // ];
  console.log(roleOptionEdit, "finish");
  React.useEffect(() => {
    getAllUser();
    getRole();
    getType();
    if (localStorage.getItem("userToken")) {
      let dataInfo = JSON.parse(`${localStorage.getItem("userToken")}`);
      let info: any = decode(dataInfo);
      getUserRoleDetail({ id: info.data.id });
    }
  }, []);

  return (
    <>
      <div className="admin">
        <div className="container-full">
          <div className="admin-nav">
            <div className="nav-menu">
              <p className="text-xl">USER</p>
              <div className="search-bar">
                <label htmlFor="search-bar" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search-bar"
                  placeholder="Search by email"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <img src="search-icon.svg" alt="search icon" />
              </div>
            </div>
            <div className="middle-menu">
              <div>
                <div className="btn-create relative">
                  <span>All ({users.length}) </span>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#createUserModal"
                    type="button"
                  >
                    Create new user
                  </button>
                  <div
                    className="w-full modal fade"
                    id="createUserModal"
                    tabIndex={-1}
                    aria-labelledby="editUserModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" style={{ maxWidth: "800px" }}>
                      <div className="modal-content">
                        <div className="modal-header bg-white">
                          <h2
                            className="text-left "
                            style={{
                              fontWeight: 700,
                              fontSize: "20px",
                              lineHeight: "30px",
                              color: " #006C84",
                            }}
                          >
                            CREATE NEW USER
                          </h2>
                        </div>
                        <form
                          className=" flex justify-between w-full center modal-body"
                          action="#"
                          method="POST"
                        >
                          <div style={{ width: "40%" }}>
                            <label
                              htmlFor="first-name"
                              className="info-required"
                            >
                              First name
                            </label>
                            <div className="pb-3">
                              <input
                                id="first-name"
                                name="userFirstName"
                                type="text"
                                required
                                onChange={handleOnChangeSignup}
                                className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="User's first name"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <label
                              htmlFor="last-name"
                              className="info-required"
                            >
                              Last name
                            </label>
                            <div className="pb-3">
                              <input
                                id="last-name"
                                name="userLastName"
                                onChange={handleOnChangeSignup}
                                type="text"
                                autoComplete="current-password"
                                required
                                className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="User's last name"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <label
                              htmlFor="userDob"
                              style={{
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#262626",
                              }}
                            >
                              Day of birth
                            </label>
                            <div className="pb-3">
                              <input
                                id="day-of-birth"
                                name="userDob"
                                onChange={handleOnChangeSignup}
                                type="date"
                                required
                                className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <label
                              htmlFor="user-email"
                              className="info-required"
                            >
                              Email
                            </label>
                            <div className="pb-3">
                              <input
                                id="user-email"
                                name="userEmail"
                                onChange={handleOnChangeSignup}
                                type="email"
                                autoComplete="email"
                                required
                                className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="User's email address"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <label
                              htmlFor="userAdress"
                              className="info-required"
                            >
                              Adress
                            </label>
                            <div className="pb-3">
                              <input
                                id="userAdress"
                                name="userAdress"
                                onChange={handleOnChangeSignup}
                                type="text"
                                autoComplete="current-password"
                                required
                                className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="User's last name"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <label
                              htmlFor="userPhoneNumber"
                              className="info-required"
                            >
                              Phone Number
                            </label>
                            <div className="pb-3">
                              <input
                                id="userPhoneNumber"
                                name="userPhoneNumber"
                                onChange={handleOnChangeSignup}
                                type="number"
                                autoComplete="current-password"
                                required
                                className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="User's Phone Number"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                          </div>
                          <div style={{ width: "55%" }}>
                            <label htmlFor="password" className="info-required">
                              Password
                            </label>
                            <div className=" showPassWord pb-3">
                              <input
                                id="password"
                                name="userPassword"
                                onChange={handleOnChangeSignup}
                                type={isPasswordViewed2 ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm "
                                placeholder="Your password"
                                style={{ borderRadius: 4 }}
                              />
                              <span>
                                <img
                                  id="on"
                                  onClick={() => {
                                    setIsPasswordViewed2(!isPasswordViewed2);
                                  }}
                                  src={
                                    isPasswordViewed2
                                      ? "show-pass.svg"
                                      : "no-show-pass.svg"
                                  }
                                />
                              </span>
                            </div>
                            <label
                              htmlFor="confirm-password"
                              className="info-required"
                            >
                              Confirm password
                            </label>
                            <div className=" showPassWord pb-3">
                              <input
                                id="confirm-password"
                                name="confirmPassword"
                                type={isPasswordViewed ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm mb-1 "
                                placeholder="Password"
                                style={{ borderRadius: 4 }}
                                onChange={(e) => {
                                  setConfirmPass({
                                    confirmPassword: e.target.value,
                                  });
                                  console.log(confirmPass, "eee");
                                  console.log(formSignup.userPassword, "aaa");
                                  handleOnChangeSignup;
                                  if (
                                    confirmPass.confirmPassword !==
                                    e.target.value
                                  ) {
                                    setIsError(true);
                                  } else {
                                    setIsError(false);
                                  }
                                  console.log(isError);
                                }}
                              />
                              <span>
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
                            {/* {isError ? (
                              <p className="validation-info m-0">
                                Password does not match
                              </p>
                            ) : (
                              ""
                            )} */}

                            <div className="pb-3 flex flex-column flex-start">
                              <label
                                htmlFor="user-role"
                                className="info-required pr-5"
                              >
                                Role
                              </label>

                              <Select
                                options={roleOptionEdit[0]}
                                className="w-100 rounded-md shadow-sm mb-1  "
                                components={animatedComponents}
                                onChange={async (e: any) => {
                                  setFormSignUp({
                                    ...formSignup,
                                    userRole: e.value,
                                  });
                                  getRoleDetail({ id: e.value });

                                  let result = await axios
                                    .post("/api/roleApi/role-detail", {
                                      userRole: e.value,
                                    })
                                    .then((result) => {
                                      setRelaUser({
                                        ...relaType,
                                        relaUser: result.data.content,
                                      });
                                      console.log(result.data.content);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                                placeholder="Select Role"
                              />
                            </div>

                            <div className="pb-3 flex flex-column flex-start ">
                              <label
                                htmlFor="user-role"
                                className="info-required pr-5"
                              >
                                Type
                              </label>
                              <Select
                                className="w-100 rounded-md shadow-sm mb-1 "
                                options={typeOptionEdit[0]}
                                components={animatedComponents}
                                onChange={async (e: any) => {
                                  setFormSignUp({
                                    ...formSignup,
                                    userType: Number(e.value),
                                  });

                                  console.log(formSignup, "select role");
                                  await axios
                                    .put("/api/userApi/signup", {
                                      userType: e.value,
                                    })
                                    .then((result) => {
                                      console.log(result.data, "type nef");
                                      setRelaType({
                                        ...relaType,
                                        relaType: result.data.content,
                                      });
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                                placeholder="Select Type"
                              />
                            </div>
                          </div>
                        </form>
                        <div className="px-3">
                          {rol.includes("type") || rol.includes("all") ? (
                            <div
                              style={{
                                maxHeight: 200,
                                overflow: "hidden",
                                overflowY: "scroll",
                                width: "100%",
                              }}
                            >
                              <label
                                htmlFor="relatedType"
                                className="info-required"
                              >
                                Related Type
                              </label>

                              <div className="pb-3">
                                <table>
                                  <thead>
                                    <tr>
                                      <th style={{ fontSize: 12 }}>Select</th>
                                      <th style={{ fontSize: 12 }}>Stt</th>
                                      <th style={{ fontSize: 12 }}>
                                        First Name
                                      </th>
                                      <th style={{ fontSize: 12 }}>
                                        Last Name
                                      </th>
                                      <th style={{ fontSize: 12 }}>Email</th>
                                      <th style={{ fontSize: 12 }}>
                                        Phone Number
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {relaType.relaType
                                      ? relaType.relaType?.map(
                                          (item: any, index: number) => {
                                            return (
                                              <tr key={item.id}>
                                                <td>
                                                  <input
                                                    name="relaType"
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={
                                                      handleChangeChecked
                                                    }
                                                  />
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {index++}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userFirstName}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userLastName}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userEmail}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userPhoneNumber}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )
                                      : null}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ) : null}

                          {rol.includes("point") || rol.includes("all") ? (
                            <div
                              style={{
                                maxHeight: 200,
                                overflow: "hidden",
                                overflowY: "scroll",
                                width: "100%",
                              }}
                            >
                              <label
                                htmlFor="relatedUser"
                                className="info-required"
                              >
                                Related User
                              </label>
                              <div className="pb-3">
                                <table>
                                  <thead>
                                    <tr>
                                      <th style={{ fontSize: 12 }}>Select</th>
                                      <th style={{ fontSize: 12 }}>Stt</th>
                                      <th style={{ fontSize: 12 }}>
                                        First Name
                                      </th>
                                      <th style={{ fontSize: 12 }}>
                                        Last Name
                                      </th>
                                      <th style={{ fontSize: 12 }}>Email</th>
                                      <th style={{ fontSize: 12 }}>
                                        Phone Number
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {relaUser.relaUser
                                      ? relaUser.relaUser.map(
                                          (item: any, index: number) => {
                                            return (
                                              <tr key={item.id}>
                                                <td>
                                                  <input
                                                    name="relaUser"
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={
                                                      handleChangeChecked
                                                    }
                                                  />
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {index++}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userFirstName}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userLastName}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userEmail}
                                                </td>
                                                <td style={{ fontSize: 12 }}>
                                                  {item.userPhoneNumber}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )
                                      : null}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            data-bs-dismiss="modal"
                            style={{
                              fontWeight: 700,
                              fontSize: "20px",
                              lineHeight: "22px",
                              color: "white",
                              padding: "7px 17px",

                              backgroundColor: "#9c4141",
                            }}
                          >
                            Close
                          </button>
                          <button
                            className="btnEffect "
                            style={{
                              fontWeight: 700,
                              fontSize: "20px",
                              lineHeight: "22px",
                              color: "white",
                              padding: "7px 17px",
                            }}
                            onClick={() => {
                              formCreateUserFetch(formSignup);
                            }}
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      right: "-30px",
                      bottom: "23%",
                    }}
                  >
                    <a href="#">
                      <img src="download-user.svg" alt="download icon" />
                    </a>
                  </span>
                </div>
              </div>
              <div className="search-by-tag">
                {/* <Select value={sorting} onChange={handleChangeSorting} sx={{''}}>

                    </Select> */}
              </div>
            </div>
          </div>
          <table className="table-auto ">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Email</th>
                <th
                  className="cursor-pointer"
                  onClick={() => sorting("userFirstName")}
                >
                  {sort !== "ASC" ? (
                    <div className="d-flex align-items-center gap-2">
                      <p className="m-0">Day of birth</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-up-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      <p className="m-0">Day of birth</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-down-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>{" "}
                    </div>
                  )}{" "}
                </th>
                <th>Phone</th>
                <th>Role</th>
                <th>Type</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {users
                ?.filter((item: any) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.userEmail.toLowerCase().includes(search);
                })
                .map((user: any, index) => {
                  return (
                    <tr key={user.id}>
                      <td className="text-start">{index++}</td>
                      <td>{user.userFirstName}</td>
                      <td style={{ textAlign: "start" }}>{user.userEmail}</td>
                      <td>{user.userDob.replace("T00:00:00.000Z", "")}</td>
                      <td>{user.userPhoneNumber}</td>
                      <td>{user.userRole}</td>
                      <td>{user.userType}</td>
                      <td>
                        <div>
                          <button
                            className="del-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            type="button"
                          >
                            <img src="trash-icon.svg" alt="delete user" />
                          </button>

                          <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog"
                              style={{ maxWidth: "800px" }}
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    <img
                                      src="warning-icon.svg"
                                      alt="warning icon"
                                    />{" "}
                                    Delete this User?
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  />
                                </div>
                                <div className="modal-body text-xl">
                                  Warning! This cannot be undone.
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="cancel-button"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="del-user-button"
                                    onClick={() => {
                                      let data = { id: user.id };
                                      delUser({ data });
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            className="edit-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#editUser"
                            type="button"
                            onClick={() => {
                              setformUpdate(user);
                              getUserDetail({ id: user.id });
                              console.log(userDetail);
                            }}
                          >
                            <img src="edit-icon.svg" alt="edit user" />
                          </button>
                        </div>
                        <div>
                          <button
                            className="view-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#userDetail"
                            type="button"
                            onClick={() => {
                              // setUserDetail(user);
                              getUserDetail({ id: user.id });
                              console.log(user.userType, "id");
                              getTypeDetail({ id: user.userType });
                              console.log(userDetail.userDob, "eee");
                              // let role =
                            }}
                          >
                            <img src="view-icon.svg" alt="view user" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>
            <div
              className="modal fade edit-user"
              id="userDetail"
              tabIndex={-1}
              aria-labelledby="editUserModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ maxWidth: "800px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      User detail
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body text-xl">
                    <form className="  flex justify-between w-full center">
                      <div style={{ width: "40%" }}>
                        <label htmlFor="first-name" className="info-required">
                          First name
                        </label>
                        <div className="pb-3">
                          <input
                            id="first-name"
                            name="userFirstName"
                            type="text"
                            value={userDetail.userFirstName}
                            readOnly
                            className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your first name"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label htmlFor="last-name" className="info-required">
                          Last name
                        </label>
                        <div className="pb-3">
                          <input
                            id="last-name"
                            name="userLastName"
                            value={userDetail.userLastName}
                            readOnly
                            onChange={(e) => {
                              userInfo = {
                                ...userInfo,
                                userLastName: e.target.value,
                              };
                              console.log(formSignup);
                            }}
                            type="text"
                            autoComplete="current-password"
                            required
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your last name"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label
                          htmlFor="day-of-birth"
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#262626",
                          }}
                        >
                          Day of birth
                        </label>
                        <div className="pb-3">
                          <input
                            id="day-of-birth"
                            value={userDetail.userDob.replace(
                              "T00:00:00.000Z",
                              ""
                            )}
                            readOnly
                            pattern="\d{4}-\d{2}-\d{2}"
                            name="dayOfBirth"
                            onChange={(e) => {
                              userInfo = {
                                ...userInfo,
                                userDayOfBirth: e.target.value,
                              };
                            }}
                            type="date"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label htmlFor="user-email" className="info-required">
                          Email
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userEmail"
                            value={userDetail.userEmail}
                            readOnly
                            onChange={(e) => {
                              setFormSignUp({
                                ...formSignup,
                                userEmail: e.target.value,
                              });
                            }}
                            type="email"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "55%" }}>
                        <label
                          htmlFor="user-role"
                          className="info-required pr-5"
                        >
                          User Roles
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userRole"
                            defaultValue={roles}
                            readOnly
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label
                          htmlFor="roleDescription"
                          className="info-required pr-5"
                        >
                          Description
                        </label>
                        <div className="pb-3">
                          <input
                            id="roleDescription"
                            name="roleDescription"
                            defaultValue={roleDetail}
                            readOnly
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <label
                          htmlFor="user-role"
                          className="info-required pr-5"
                        >
                          User Types
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userRole"
                            defaultValue={typeDetail.typeName}
                            readOnly
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="cancel-button"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade edit-user"
              id="editUser"
              tabIndex={-1}
              aria-labelledby="editUserModal"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ maxWidth: "800px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      Update User
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body text-xl">
                    <form className="  flex justify-between w-full center">
                      <div style={{ width: "40%" }}>
                        <label htmlFor="first-name" className="info-required">
                          First name
                        </label>
                        <div className="pb-3">
                          <input
                            id="first-name"
                            name="userFirstName"
                            type="text"
                            value={formUpdate.userFirstName}
                            className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your first name"
                            style={{ borderRadius: 4 }}
                            onChange={handleOnchange}
                          />
                        </div>
                        <label htmlFor="last-name" className="info-required">
                          Last name
                        </label>
                        <div className="pb-3">
                          <input
                            id="last-name"
                            name="userLastName"
                            value={formUpdate.userLastName}
                            onChange={handleOnchange}
                            type="text"
                            autoComplete="current-password"
                            required
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your last name"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label
                          htmlFor="userDob"
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#262626",
                          }}
                        >
                          Day of birth
                        </label>
                        <div className="pb-3">
                          <input
                            id="userDob"
                            value={formUpdate.userDob.replace(
                              "T00:00:00.000Z",
                              ""
                            )}
                            name="userDob"
                            onChange={handleOnchange}
                            type="date"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label htmlFor="user-email" className="info-required">
                          Email
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userEmail"
                            value={formUpdate.userEmail}
                            disabled
                            type="email"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "55%" }}>
                        <label
                          htmlFor="user-role"
                          className="info-required pr-5"
                        >
                          User Roles
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userRole"
                            defaultValue={roles}
                            disabled
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                          <Select
                            options={roleOptionEdit[0]}
                            isMulti
                            className="select-option"
                            components={animatedComponents}
                            onChange={(e) => {
                              let data = e.map((e: any) => e.value);
                              setformUpdate({
                                ...formUpdate,
                                userRole: Number(data),
                              });
                              console.log(formUpdate, "select role");
                            }}
                          />
                        </div>
                        <label
                          htmlFor="roleDescription"
                          className="info-required pr-5"
                        >
                          Description
                        </label>
                        <div className="pb-3">
                          <input
                            id="roleDescription"
                            name="roleDescription"
                            defaultValue={roleDetail}
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <label
                          htmlFor="userType"
                          className="info-required pr-5"
                        >
                          User Types
                        </label>
                        <div className="pb-3">
                          <Select
                            options={typeOptionEdit[0]}
                            isMulti
                            components={animatedComponents}
                            onChange={(e) => {
                              let data = e.map((e: any) => e.value);
                              setformUpdate({
                                ...formUpdate,
                                userType: Number(data),
                              });
                              console.log(formUpdate, "select type");
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="cancel-button"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                    <button
                      className="btnEffect "
                      style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        lineHeight: "22px",
                        color: "white",
                        padding: "7px 17px",
                      }}
                      onClick={() => {
                        editUser(formUpdate);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminTemplate;
