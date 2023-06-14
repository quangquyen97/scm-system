import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Tab, Table } from "semantic-ui-react";
import {
  getUserDefaultData,
  newActionModal,
} from "../../../recoil/Modal/modalState";
// import { getAllUser } from "../../../recoil/services/userService";

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

  const setModalHandle = useSetRecoilState(newActionModal);
  const handleModal = (action: string) => {
    setModalHandle(action);
  };

  // const userData = useRecoilValue(getUserDefaultData);
  // console.log(userData, "user");

  // userData(getAllUser as any);
  // console.log(tableData, "tableData");
  // let data = getAllUser();
  // const {data} = getAllUser()
  // console.log(data,'data')
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
                    <Button
                      style={{ fontSize: "2px" }}
                      onClick={() => {
                        handleModal("MODAL_OPEN");
                      }}
                    >
                      <img
                        src="/trash-icon.svg"
                        alt="delete user"
                        style={{ scale: "0.8" }}
                      />
                    </Button>

                    <Button
                      style={{ fontSize: "2px" }}
                      onClick={() => {
                        handleModal("MODAL_OPEN");
                      }}
                    >
                      <img
                        src="/edit-icon.svg"
                        alt="edit user"
                        style={{ scale: "0.8" }}
                      />
                    </Button>

                    <Button
                      style={{ fontSize: "2px" }}
                      onClick={() => {
                        getUserDetail({ id: user.id });
                        console.log(user.id);
                        getTypeDetail({ id: user.userType });
                        handleModal("MODAL_OPEN");
                        // userIdRecoil(user.id);
                      }}
                    >
                      <img
                        src="/view-icon.svg"
                        alt="view user"
                        style={{ scale: "0.8" }}
                      />
                    </Button>
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
