import { Check, X } from "lucide-react";
import Button from "../../../components/Button/button";


const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, transactionId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-[#FF6500] p-6 rounded-xl shadow-xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Delete Transaction</h2>
                <p className="mb-6">
                    Are you sure you want to delete Transaction #{transactionId.slice(0, 8)}?
                </p>
                <div className="flex justify-end gap-4">
                    <Button variant="black" onClick={onClose}>
                        <X size={16} />
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        <Check size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmDeleteModal;
