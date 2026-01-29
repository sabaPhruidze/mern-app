import { useState } from "react";
import Modal from "../ui/Modal";

type GoalEditModalProps = {
  initialText: string;
  onClose: () => void;
  onSave: (newText: string) => void;
};

const GoalEditModal = ({ initialText, onClose, onSave }: GoalEditModalProps) => {
  const [text, setText] = useState(initialText);
  const [error, setError] = useState("");

  const handleSave = () => {
    const v = text.trim();
    if (!v) return setError("Text is required.");
    onSave(v);
  };

  return (
    <Modal open={true} title="Edit goal" onClose={onClose}>
      <label className="text-sm text-gray-700">Text</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-2 w-full min-h-30 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
      />
      {error ? <p className="text-xs text-red-600 mt-2">{error}</p> : null}

      <div className="flex items-center justify-end gap-2 mt-4">
        <button onClick={onClose} className="px-3 py-2 rounded-lg text-sm border border-gray-200">
          Cancel
        </button>
        <button onClick={handleSave} className="px-3 py-2 rounded-lg text-sm bg-gray-900 text-white">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default GoalEditModal;
