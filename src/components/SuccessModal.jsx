const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center animate-fadeIn">
        <div className="text-green-600 text-5xl mb-3">✔</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enrollment Successful
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for registering. Our team will contact you shortly.
        </p>

        <button
          onClick={onClose}
          className="bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
