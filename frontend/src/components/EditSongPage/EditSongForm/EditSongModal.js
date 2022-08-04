import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../../context/Modal";
import EditSongForm from "./index.js";

function EditSongModal() {
  const songId = useParams().id;
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.audioFile[songId]);
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {sessionUser.id === song.userId ? (
        <div>
          <button
            className="button"
            id="createAccountButton"
            onClick={() => setShowModal(true)}
          >
            Edit Song
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditSongForm setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default EditSongModal;
