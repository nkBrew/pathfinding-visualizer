import React from 'react';

type ModalButtonProps = {
  label: string;
  onClickHandler: () => void;
};

const ModalButton = ({ label, onClickHandler }: ModalButtonProps): JSX.Element => {
  return <button onClick={onClickHandler}>{label}</button>;
};

export default ModalButton;
