import React, { useRef, useEffect } from "react";
import Comments from "./Comments";
function IdeaModal({ ideaData, onClose }) {
  const modalRef = useRef(null);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onClose();
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <div className="modal-box">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg align-middle">{ideaData.title}</h3>
          <button
            onClick={handleClose}
            className="align-middle text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm w-8 h-8"
          >
            X
          </button>
        </div>
        <p className="py-4">{ideaData.description}</p>
        <Comments ideaId={ideaData._id} />
      </div>
    </dialog>
  );
}

export default IdeaModal;
