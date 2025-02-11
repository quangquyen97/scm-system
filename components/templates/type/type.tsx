import React, { Fragment, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import swal from "sweetalert";

function Type() {
  const [typeDetail, setTypeDetail] = React.useState({
    typeName: "",
    typeDescription: "",
    typeLevel: "",
    id: 0,
  });
  const [idType, setId] = React.useState({
    typeName: "",
    typeDescription: "",
    typeLevel: Number(""),
    id: 0,
  });
  const [typeCreate, setTypeCreate] = React.useState({
    typeName: "",
    typeDescription: "",
    typeLevel: "",
  });
  let userInfo = {
    userDayOfBirth: "",
    userFirstName: "",
    userLastName: "",
    confirmPassword: "",
  };
  const [search, setSearch] = useState('')
  const delType = async (id: object) => {
    await axios
      .delete("/api/typeApi/delete-type", id)
      .then((result) => {
        swal({
          title: "Delete Type success!!",
          text: `${result}`,
          icon: "success",
        });
        getType();
      })
      .catch((err: any) => {
        console.log(err.response.data.content);
        swal({
          title: "Opps!",
          text: `${err.response.data.message}`,
          icon: "error",
        });
      });
  };

  const editType = async (data: object) => {
    await axios
      .put("api/typeApi/update-type", data)
      .then((result) => {
        swal({
          title: "Update Success!",
          text: `${result.data.message}`,
          icon: "success",
        });
        console.log(result, "update role");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formCreateTypeFecth = async (data: object) => {
    try {
      await axios
        .post("/api/typeApi/create-type", data)
        .then((result) => {
          swal({
            title: "Create Role success!!",
            text: `${result}`,
            icon: "success",
          });
          getType();
        })
        .catch((err) => {
          swal({
            title: "Type name is exist",
            text: `${err}`,
            icon: "error",
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  const [type, setType] = React.useState([]);

  const getType = async () => {
    await axios
      .get("/api/typeApi/get-all-type")
      .then((result) => {
        setType(result.data.content);
      })
      .catch((err) => {});
  };
  const handleOnchange = (e: any) => {
    let { name } = e.target;
    setId({ ...idType, [name]: e.target.value });
    console.log(idType, "idType");
  };
  const handleOnchangeCreateType = (e: any) => {
    let { name } = e.target;
    setTypeDetail({ ...typeDetail, [name]: e.target.value });
    console.log(typeDetail, "update");
  };
  const getTypeDetail = async (data: any) => {
    await axios
      .put("/api/typeApi/type-detail", data)
      .then((result) => {
        setTypeDetail(result.data.content[0]);
        setId(result.data.content);
        console.log(idType)
        console.log(result.data.content, "content", typeDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [sort, setSort] = useState("ASC");
  const sorting = (col: any) => {
    if (sort === "ASC") {
      const sorted = [...type].sort((a: string, b: string) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
      );
      setType(sorted);
      setSort("DSC");
    }
    if (sort === "DSC") {
      const sorted = [...type].sort((a: string, b: string) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
      );
      setType(sorted);
      setSort("ASC");
    }
  };
  React.useEffect(() => {
    getType();

  }, []);

  return (
    <>
      <div className="admin">
        <div className="container-full">
          <div className="admin-nav">
            <div className="nav-menu">
              <p className="text-xl">TYPE</p>
              <div className="search-bar">
                <label htmlFor="search-bar" className="sr-only">
                  Search
                </label>
                <input type="text" id="search-bar" placeholder="Search..." onChange={(e) => { 
                  setSearch(e.target.value)
                 }} />
                <img src="search-icon.svg" alt="search icon" />
              </div>
            </div>
            <div className="middle-menu">
              <div>
                <div className="btn-create relative">
                <span>All ({type.length})</span>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#createRoleModal"
                    type="button"
                  >
                    Create new type
                  </button>
                  <div
                    className="w-full modal fade"
                    id="createRoleModal"
                    tabIndex={-1}
                    aria-labelledby="createRoleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header bg-white">
                          <h2
                            className="text-left "
                            style={{
                              fontWeight: 700,
                              fontSize: "20px",
                              lineHeight: "30px",
                              color: " #006C84",
                              width: "800px",
                            }}
                          >
                            CREATE NEW TYPE
                          </h2>
                        </div>
                        <div className=" flex justify-between w-full center modal-body">
                          <div style={{ width: "60%" }}>
                            <label htmlFor="typeName" className="info-required">
                              Type Name
                            </label>
                            <div className="pb-3">
                              <input
                                id="typeName"
                                name="typeName"
                                type="text"
                                onChange={handleOnchange}
                                className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="Name of role"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <label
                              htmlFor="typeDescription"
                              className="info-required"
                            >
                              Type Description
                            </label>
                            <div className="pb-3">
                              <input
                                id="typeDescription"
                                name="typeDescription"
                                type="text"
                                required
                                onChange={handleOnchange}
                                className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                                placeholder="Detailed description"
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                          </div>
                          <div style={{ width: "35%" }}>
                            <div className=" flex flex-column  spac">
                              <label
                                htmlFor="typeLevel"
                                className="info-required pr-5"
                              >
                                Type Level
                              </label>

                              <div className="pb-3">
                                <input
                                  id="first-name"
                                  name="typeLevel"
                                  type="number"
                                  required
                                  onChange={handleOnchange}
                                  className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                                  placeholder="Detailed description"
                                  style={{ borderRadius: 4 }}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            data-bs-dismiss="modal"
                            style={{
                              fontWeight: 700,
                              fontSize: "20px",
                              lineHeight: "22px",
                              color: "white",
                              padding: "7px 17px",
                              position: "absolute",
                              backgroundColor: "#9c4141",
                              right: 130,
                              bottom: "-30px",
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
                              position: "absolute",
                              right: 30,
                              bottom: "-30px",
                            }}
                            onClick={() => {
                              formCreateTypeFecth(idType);
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
                      right: "-20%",
                      bottom: "23%",
                    }}
                  >
                    <a href="#">
                      <img src="download-user.svg" alt="download icon" />
                    </a>
                  </span>
                </div>
              </div>
          
            </div>
          </div>
          <table className="table-auto ">
            <thead>
              <tr>
                <th>STT</th>
                <th onClick={() => sorting("typeName")}>{sort !== "ASC" ? (
                    <div className="d-flex align-items-center gap-2">
                      <p className="m-0">Name of type</p>
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
                      <p className="m-0">Name of type</p>
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
                  )}</th>
                <th>Description</th>
                <th>Type Level</th>

                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {type?.filter((item:any) => { 
                    return search.toLowerCase() === '' ? item: item.typeName.toLowerCase().includes(search)
               }).map((type: any, index) => {
                return (
                  <tr key={type.id}>
                    <td className="text-start">{index++}</td>
                    <td>{type.typeName}</td>
                    <td style={{ textAlign: "start" }}>
                      {type.typeDescription}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{type.typeLevel}</td>

                    <td className="d-flex">
                      <div>
                        <button
                          className="del-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          type="button"
                          onClick={() => {
                            setId(type.id);
                            console.log(type.id);
                          }}
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
                          <div className="modal-dialog">
                            <div
                              className="modal-content"
                              style={{ width: "800px" }}
                            >
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  <img
                                    src="warning-icon.svg"
                                    alt="warning icon"
                                  />{" "}
                                  Delete this Role?
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
                                    let data = { id: idType };
                                    console.log(data);
                                    delType({ data });
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
                            getTypeDetail({ id: type.id });
                            console.log({ id: type.id });
                          }}
                        >
                          <img src="edit-icon.svg" alt="edit user" />
                        </button>
                      </div>
                      <div>
                        <button
                          className="view-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#roleDetail"
                          type="button"
                          onClick={() => {
                            // setUserDetail(user);
                            // getUserDetail({ id: user.id });

                            getTypeDetail({ id: type.id });
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
              className="modal fade edit-user w-full"
              id="roleDetail"
              tabIndex={-1}
              aria-labelledby="editUserModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{ width: "800px" }}>
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      Type detail
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <form className=" flex justify-between w-full center modal-body">
                    <div style={{ width: "40%" }}>
                      <label htmlFor="typeName" className="info-required">
                        Type Name
                      </label>
                      <div className="pb-3">
                        <input
                          id="typeName"
                          name="typeName"
                          type="text"
                          value={typeDetail.typeName}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Name of role"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                      <label
                        htmlFor="typeDescription"
                        className="info-required"
                      >
                        Type Description
                      </label>
                      <div className="pb-3">
                        <input
                          id="typeDescription"
                          name="typeDescription"
                          type="text"
                          value={typeDetail.typeDescription}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "55%" }}>
                      <label htmlFor="typeLevel" className="info-required">
                        Type Level
                      </label>
                      <div className="pb-3">
                        <input
                          id="typeLevel"
                          name="typeLevel"
                          type="text"
                          value={typeDetail.typeLevel}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                    </div>
                  </form>
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
          </div>
          <div
            className="modal fade edit-user"
            id="editUser"
            tabIndex={-1}
            aria-labelledby="editUserModal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content" style={{ width: "800px" }}>
                <div className="modal-header">
                  <h1 className="modal-title" id="editUserModalLabel">
                    Update Type
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className=" flex justify-between w-full center modal-body">
                  <div style={{ width: "40%" }}>
                    <label htmlFor="typeName" className="info-required">
                      Type Name
                    </label>
                    <div className="pb-3">
                      <input
                        id="typeName"
                        name="typeName"
                        type="text"
                        value={typeDetail.typeName}
                        onChange={handleOnchangeCreateType}
                        className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Name of role"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                    <label htmlFor="typeDescription" className="info-required">
                      Type Description
                    </label>
                    <div className="pb-3">
                      <input
                        id="first-name"
                        name="typeDescription"
                        type="text"
                        value={typeDetail.typeDescription}
                        onChange={handleOnchangeCreateType}
                        className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                  </div>
                  <div style={{ width: "55%" }}>
                    <label htmlFor="typeLevel" className="info-required">
                      Type Level
                    </label>
                    <div className="pb-3">
                      <input
                        id="typeLevel"
                        name="typeLevel"
                        type="text"
                        value={typeDetail.typeLevel}
                        onChange={handleOnchangeCreateType}
                        className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex align-center ">
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
                      editType(typeDetail);
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
    </>
  );
}

export default Type;
