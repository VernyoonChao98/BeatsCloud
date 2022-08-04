import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePlaylistForm from "../Forms/CreatePlaylistForm";

function CreatePlaylistModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setShowModal(true)}>
        Add Playlist
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePlaylistForm />
        </Modal>
      )}
    </>
  );
}

export default CreatePlaylistModal;
