import React, { useEffect, useRef, useState } from 'react';
import '../styles/Modal.scss';
import ModalButton from './ModalButton/ModalButton';
import PageContent from './Pages/PageContent';
import { PagesArray } from './Pages/Pages';

const Modal = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (window.innerWidth < 760) {
      window.scrollTo({ top: 0 });
      if (ref != null && ref.current != null) {
        ref.current.scrollTo(0, 0);
      }
    }
  }, [page]);

  return (
    <div id="modal" ref={ref} className="modal" onClick={closeModal} style={{ display: open ? 'block' : 'none' }}>
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
