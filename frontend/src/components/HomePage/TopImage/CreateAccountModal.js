import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import SignupForm from "./SignUpFormPage/index";

function CreateAccount() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="button"
        id="createAccountButton"
        onClick={() => setShowModal(true)}
      >
        Create account
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default CreateAccount;
