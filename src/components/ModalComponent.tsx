import React, { FC } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "@styles/Modal.scss";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
};

const Modal: FC<ModalProps> = ({ children, onClose, open }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
