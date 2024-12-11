/* eslint-disable react/prop-types */
import Modal from "react-modal";

Modal.setAppElement("#root");

function DeleteConfirmationModal({ onConfirm, taskTitle, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      className="bg-white rounded-md shadow-md p-6 w-96 max-w-full mx-4 sm:mx-6"
    >
      <div className="text-center">
        <h2 className="text-lg font-bold text-red-600">
          Are you absolutely sure?
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          This will permanently delete the task{" "}
          <strong>&quot;{taskTitle.slice(0, 35)}&quot;</strong>. This action
          cannot be undone.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
