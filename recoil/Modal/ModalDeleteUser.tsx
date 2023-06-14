import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";
// import { delUser } from "../services/userService";
import { newActionModal } from "./modalState";

function ModalDelete() {
  const modalState = useRecoilValue(newActionModal);
  const onModalHandle = useSetRecoilState(newActionModal);
  return (
    <div>
      <Button >Default</Button>

      <Modal dimmer="blurring" open={modalState.open}>
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Content>
         This action will be undone !!!
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => 
          {
            // delUser(id)
          }
          }>
            Disagree
          </Button>
          <Button positive >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalDelete;
