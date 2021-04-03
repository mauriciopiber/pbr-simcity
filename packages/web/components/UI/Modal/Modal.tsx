import React, { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        {children}
      </div>
      <style jsx>
        {`
          .modal {
            display: flex;
            transition: opacity 200ms ease 0s;
            opacity: 1;
            position: fixed;
            inset: 0px;
            z-index: 9999;
            justify-content: center;
            align-items: center;
            border-radius: 1px;
            background-color: rgba(0, 0, 0, 0.5);
            box-sizing: border-box;
          }
          .modal__wrapper {
            background-color: #ffffff;
          }
        `}
      </style>
    </div>
  );
}

export default Modal;
