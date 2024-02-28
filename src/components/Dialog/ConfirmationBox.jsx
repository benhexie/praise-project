import { Fragment } from "react";
import "./ConfirmationBox.css";

const ConfirmationBox = ({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  ...props
}) => {
  const overlayClick = (e) => {
    if (e.target.classList.contains("confirmation__overlay")) {
      onCancel();
    }
  };

  return (
    <Fragment>
      <div className="confirmation__overlay" onClick={overlayClick} />
      <div className="confirmation__box" {...props}>
        <p>{message}</p>
        <div className="confirmation__box__actions">
          <button
            className="confirmation__box__actions__cancel"
            onClick={onCancel}
          >
            {cancelText || "No"}
          </button>
          <button
            className="confirmation__box__actions__confirm"
            onClick={onConfirm}
          >
            {confirmText || "Yes"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmationBox;
