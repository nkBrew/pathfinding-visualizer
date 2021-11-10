import React from 'react';

type ModalButtonProps = {
  label: string;
  onClickHandler: () => void;
};

const ModalButton = ({ label, onClickHandler }: ModalButtonProps): JSX.Element => {
  return (
    <button className="modal-button" onClick={onClickHandler}>
      {label}
    </button>
  );
};

export default ModalButton;
