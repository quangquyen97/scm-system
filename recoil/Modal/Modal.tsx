import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";
import { newActionModal } from "./modalState";

function ModalExampleDimmer() {
  const modalListAtt = useRecoilValue(newActionModal);
  const setModalHandle = useSetRecoilState(newActionModal);
  const handleModal = (action: string) => {
    setModalHandle(action);
  };
  return (
    <div className="h-auto w-auto">
      <Button
        onClick={() => {
          handleModal("MODAL_OPEN");
          console.log(modalListAtt);
        }}
      >
        Default
      </Button>
      <Modal
        dimmer="blurring"
        open={modalListAtt.open}
        // onClose={handleModal("MODAL_CLOSE")}
        className="position-absolute w-auto"
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>Use Google's location service?</Modal.Header>
        <Modal.Content>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => handleModal("MODAL_CLOSE")}>
            Disagree
          </Button>
          <Button positive onClick={() => handleModal("MODAL_CLOSE")}>
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalExampleDimmer;
