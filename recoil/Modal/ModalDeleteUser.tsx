import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";
// import { delUser } from "../services/userService";
import {
  modalDeleteUserAction,
  modalSetIdAction,
  newActionModal,
} from "./modalState";

function ModalDelete() {
  const modalState = useRecoilValue(newActionModal);
  const onHandleModal = useSetRecoilState(newActionModal);
  const idValue = useRecoilValue(modalSetIdAction);
  const onHandleDeleteUser = useSetRecoilState(modalDeleteUserAction);
  const handleDelete = async () => {
    onHandleDeleteUser(await idValue);
  };
  return (
    <div>
      <Modal
        dimmer="blurring"
        open={modalState.open}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Content>This action will be undone !!!</Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              onHandleModal("MODAL_CLOSE");
            }}
          >
            Disagree
          </Button>
          <Button
            positive
            onClick={async () => {
              // console.log("ok");
              onHandleModal("MODAL_CLOSE");
              handleDelete();
            }}
          >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalDelete;
