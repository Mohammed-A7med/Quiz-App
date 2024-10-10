type DeleteConfirmation = {
  title: string;
  showModal: boolean;
  handleCloseModal: () => void;
  handleDeleteModal: () => void;
};

export default function DeleteConfirmationModal({
  title,
  showModal,
  handleCloseModal,
  handleDeleteModal,
}: DeleteConfirmation) {
  return (
    <div
      className={`${
        showModal
          ? `fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50`
          : "hidden"
      }`}
      onClick={handleCloseModal}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end items-center p-4 ">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="12"
              fill="none"
              viewBox="0 0 10 12"
              onClick={handleCloseModal}
            >
              <path
                fill="#0D1321"
                d="M6.483 6.11L9.13 2.8c.325-.405.325-1.064 0-1.47L8.542.593c-.325-.406-.852-.406-1.177 0l-2.647 3.31L2.07.594C1.745.188 1.22.188.894.594l-.589.735c-.325.407-.325 1.065 0 1.472l2.648 3.31L.305 9.42c-.325.406-.325 1.065 0 1.472l.589.735c.324.406.851.406 1.176 0l2.648-3.31 2.647 3.31c.325.406.852.406 1.177 0l.588-.736c.325-.406.325-1.064 0-1.47L6.483 6.11z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="lucide lucide-trash2 text-red-500 mx-auto my-5"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <path d="M10 11L10 17"></path>
            <path d="M14 11L14 17"></path>
          </svg>
          <h5 className="text-lg font-semibold">Delete {title}</h5>
          <p>Are you sure you want to delete this {title}?</p>
        </div>
        <div className="flex justify-end items-center p-4">
          <button
            type="button"
            className="border-2 border-gray-200 text-gray-700 rounded px-4 py-2 mr-2 hover:bg-gray-200"
            aria-label="Cancel"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
            onClick={handleDeleteModal}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
