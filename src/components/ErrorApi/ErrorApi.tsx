// ErrorModal.tsx
import React from "react";
import { Modal, Button } from "antd";

interface ErrorModalProps {
  visible: boolean;
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, errorMessage, onClose }) => {
  return (
    <Modal
      title="Error"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={
        <Button type="primary" onClick={onClose}>
          OK
        </Button>
      }
    >
      <p>{errorMessage}</p>
    </Modal>
  );
};

export default ErrorModal;
