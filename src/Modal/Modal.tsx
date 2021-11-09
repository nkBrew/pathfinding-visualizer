import React, { useState } from 'react';
import './Modal.scss';
import ModalButton from './ModalButton/ModalButton';
import PageContent from './Pages/PageContent';
import { PagesArray } from './Pages/Pages';

const Modal = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const pageContent = PagesArray[page - 1];

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.id == 'modal') {
      setOpen(false);
    }

    return;
  };

  const setPageHelper = (i: number) => {
    if ((i > 0 && page < PagesArray.length) || (i < 0 && page > 1)) {
      setPage(page + i);
    }
  };

  return (
    <div id="modal" className="modal" onClick={closeModal} style={{ display: open ? 'block' : 'none' }}>
      <div id="modal-content" className="modal-content">
        <p className="float-right">
          {page}/{PagesArray.length}
        </p>
        <PageContent {...pageContent} />
        <div className="modal-buttons-container">
          <div className="modal-buttons-flexbox">
            <ModalButton label="Previous" onClickHandler={() => setPageHelper(-1)} />
            <ModalButton label="Next" onClickHandler={() => setPageHelper(1)} />
            <ModalButton label="Close Tutorial" onClickHandler={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
