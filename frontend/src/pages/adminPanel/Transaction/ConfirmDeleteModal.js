import { Check, X } from "lucide-react";
import Button from "../../../components/Button/button";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, transactionId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-[#0B192C] rounded shadow-xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold pt-2 rounded-t px-4 py-2 bg-[#971a1a]">Delete Transaction</h2>
                <p className="mb-3 p-4">
                    Are you sure you want to delete Transaction <span className="font-bold">#{transactionId.slice(0, 8)}</span>?
                </p>
                <div className="flex justify-end gap-2 py-3 px-4">
                    <Button variant="green" onClick={onClose}>
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
