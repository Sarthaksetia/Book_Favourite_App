import React, { type MouseEvent } from "react";
import Button from "@components/Button";
import Modal from "@components/ModalComponent";
import "@styles/Modal.scss";

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="delete-modal-content">
        <p>Are you sure you want to delete this book?</p>
        <div className="delete-modal-content__buttons">
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
