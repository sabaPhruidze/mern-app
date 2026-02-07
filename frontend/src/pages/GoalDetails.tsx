import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getGoals, updateGoal, reset } from "../store/slices/goalSlices";
import GoalEditModal from "../components/goals/GoalEditModal";

const GoalDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [openEdit, setOpenEdit] = useState(false);

  const goals = useAppSelector((s) => s.goals.goals);
  const isLoading = useAppSelector((s) => s.goals.isLoading);
  const isError = useAppSelector((s) => s.goals.isError);
  const message = useAppSelector((s) => s.goals.message);
  useEffect(() => {
    if (!goals.length) {
      dispatch(getGoals());
    }
  }, [dispatch, goals.length]);

  const goal = goals.find((g) => g._id === id);

  if (isLoading && !goal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-600">Goal not found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-3 p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          title="Go back"
        >
          <FiArrowLeft />
          <span className="text-sm">Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Goal details</h1>
        <Link
          to="/"
          className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          title="Go back"
        >
          <FiArrowLeft />
        </Link>
      </div>

      {/* card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mt-6">
        <p className="text-sm text-gray-500">Created</p>
        <p className="text-sm text-gray-900 mt-1">
          {goal.createdAt.slice(0, 10)}
        </p>

        <p className="text-sm text-gray-500 mt-4">Text</p>
        <p className="text-base text-gray-900 mt-1 whitespace-pre-wrap break-all">
          {goal.text}
        </p>

        <button
          onClick={() => {
            dispatch(reset());
            setOpenEdit(true);
          }}
          className="mt-6 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
          Edit
        </button>
      </div>

      {openEdit ? (
        <GoalEditModal
          initialText={goal.text}
          onClose={() => setOpenEdit(false)}
          onSave={async (newText) => {
            try {
              await dispatch(
                updateGoal({ id: goal._id, data: { text: newText } }),
              ).unwrap();
              setOpenEdit(false);
            } catch {
              console.log("Something went wrong");
            }
          }}
          isSaving={isLoading}
          apiError={isError ? String(message || "Request failed") : ""}
        />
      ) : null}
    </div>
  );
};

export default GoalDetails;
