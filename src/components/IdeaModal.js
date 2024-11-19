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
        <h3 className="font-bold text-lg">{ideaData.title}</h3>
        <p className="py-4">{ideaData.description}</p>
        <Comments ideaId={ideaData._id} />
        <button onClick={handleClose} className="btn">
          Close
        </button>
      </div>
    </dialog>
  );
}

export default IdeaModal;
