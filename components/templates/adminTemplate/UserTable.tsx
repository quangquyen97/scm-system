import axios from "axios";
import _, { PropertyName, ObjectIterator, PartialShallow } from "lodash";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Button, Tab, Table } from "semantic-ui-react";
import {
  // getUserDefaultData,
  // getUserDefaultData,
  modalSetIdAction,
  newActionModal,
} from "../../../recoil/Modal/modalState";
import { userService } from "../../../recoil/services/userService";
// import { getAllUser } from "../../../recoil/services/userService";






interface AppProps {
  search: any;
  usersPagi: any;
  delUser: any;
  setformUpdate: any;
  getUserDetail: any;
  getTypeDetail: any;
}


function Sort(
  state: { column: any; data: any[]; direction: string },
  action: {
    type: any;
    column:
      | any
      | string
      | number
      | symbol
      | [PropertyName, any]
      | ObjectIterator<any, unknown>
      | PartialShallow<any>;
  }
) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}



export const getUserDefaultData = selector({
  key: "getUserDefaultDataS",
  get: async ({ get }) => {
    // let data = await userService.getAllUser()
    const list = get(listUserData);
    console.log(list);
    if (list.length === 0) {
      return null;
    }
    // console.log(data, 'data')
    return list;
  },
  set: ({ set, get }, newData: any) => {
    // Update state w/ new appended values
    const list = get(listUserData);
    if (!newData) {
      return null;
    }
    return set(listUserData, newData);
  },
});
const listUserData = atom({
  key: "listUser",
  default: [],
});
const UserTable = memo((props: AppProps) => {
  const {
    search,
    usersPagi,
    setformUpdate,
    delUser,
    getUserDetail,
    getTypeDetail,
  } = props;

  useEffect(() => {
    getUser();
  }, []);

  console.log(listUserData);
  const on = useSetRecoilState(getUserDefaultData);

  const getUser = useCallback(() => {
    async () => {
      await axios
        .get("/api/userApi/get-all-user")
        .then((result) => {
          console.log(result);
          on(result.data.content.usersPerPage);
        })
        .catch((err) => console.log(err));
    };
  }, []);

  const setModalHandle = useSetRecoilState(newActionModal);
  const handleModal = async (action: string) => {
    setModalHandle(action);
  };

  // const [state, dispatch] = React.useReducer(exampleReducer, {
  //   column: null,
  //   data: tableData,
  //   direction: null,
  // });
  // const { column, data, direction } = state;
  const setId = useSetRecoilState(modalSetIdAction);
  // const userData = useRecoilValue(getUserDefaultData);
  // console.log(userData); //! loop
  return (
    <>
      <Table selectable singleline sortable celled>
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
                  <Table.Cell>đang fix</Table.Cell>
                  <Table.Cell>{user.userType}</Table.Cell>
                  <Table.Cell>
                    <Button
                      style={{ fontSize: "2px" }}
                      onClick={() => {
                        setId(user.id);
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
                        // console.log(user.id);
                        getTypeDetail({ id: user.userType });
                        setId(user.id);
                        handleModal("MODAL_OPEN");
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
