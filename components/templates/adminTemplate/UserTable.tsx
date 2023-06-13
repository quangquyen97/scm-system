import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Tab, Table } from "semantic-ui-react";

interface AppProps {
  search: any;
  usersPagi: any;
  delUser: any;
  setformUpdate: any;
  getUserDetail: any;
  getTypeDetail: any;
}
const UserTable = memo((props: AppProps) => {
  const {
    search,
    usersPagi,
    setformUpdate,
    delUser,
    getUserDetail,
    getTypeDetail,
  } = props;
  useEffect(() => {}, [usersPagi]);
  return (
    <>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Day of birth</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>More</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersPagi
            ?.filter((item: any) => {
              return search.toLowerCase() === ""
                ? item
                : item.userEmail.toLowerCase().includes(search);
            })
            .map((user: any, index: number) => {
              return (
                <Table.Row key={user.id} className="item-material">
                  <Table.Cell className="text-start">{index}</Table.Cell>
                  <Table.Cell>{user.userFirstName}</Table.Cell>
                  <Table.Cell style={{ textAlign: "start" }}>
                    {user.userEmail}
                  </Table.Cell>
                  <Table.Cell>
                    {user.userDob.replace("T00:00:00.000Z", "")}
                  </Table.Cell>
                  <Table.Cell>{user.userPhoneNumber}</Table.Cell>
                  <Table.Cell>{user.userRole}</Table.Cell>
                  <Table.Cell>{user.userType}</Table.Cell>
                  <Table.Cell>
                    <div>
                      <button
                        className="del-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        type="button"
                      >
                        <img src="/trash-icon.svg" alt="delete user" />
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
                                  src="/warning-icon.svg"
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
                                  delUser({ id: user.id });
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
                          //   console.log(userDetail);
                        }}
                      >
                        <img src="/edit-icon.svg" alt="edit user" />
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
                          //   console.log(user.userType, "id");
                          getTypeDetail({ id: user.userType });
                          //   console.log(userDetail.userDob, "eee");
                          // let role =
                        }}
                      >
                        <img src="/view-icon.svg" alt="view user" />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
});

export default UserTable;
