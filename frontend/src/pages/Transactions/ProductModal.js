const ProductModal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        {footer && <div className="border-t p-4 flex justify-end space-x-2">{footer}</div>}
      </div>
    </div>
  );
};

export default ProductModal;
