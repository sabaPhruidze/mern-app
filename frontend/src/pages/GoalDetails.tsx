import { Link,useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store"
import { useState } from "react";
import GoalEditModal from "../components/goals/GoalEditModal";
import { updateGoal } from "../store/slices/goalSlices";
const GoalDetails = () => {
    const dispatch = useAppDispatch();
    const [openEdit,setOpenEdit] = useState<boolean>(false)
    
    const {id} = useParams<{id:string}>();
    const goals = useAppSelector(state => state.goals.goals);
    const goal = goals.find(goal => goal._id ===id);
    if(!goal) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-6">
                <p className="text-sm text-gray-600">Goal not found.</p>
                <Link to='/dashboard' className="text-sm underline">
                    Back
                </Link>
            </div>
        )
    }
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Goal details</h1>
            <Link to='/' className="text-sm underline">
                Back
            </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mt-6">
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-sm text-gray-800 mt-1">{goal.createdAt.slice(0,10)}</p>
            <p className="text-sm tet-gray-500 mt-4">Text</p>
            <p className="text-base text-gray-900 mt-1 whitespace-pre-wrap">{goal.text}</p>
            <button onClick={() => setOpenEdit(true)} className="mt-6 px-3 py-2 rounded-lg text-sm border border-gray-200">Edit</button>
        </div>
        {openEdit ? (
        <GoalEditModal
            initialText={goal.text}
            onClose={() => setOpenEdit(false)}
            onSave={(newText) => {
            dispatch(updateGoal({ id: goal._id, data: { text: newText } }));
            setOpenEdit(false);
            }}
        />
) : null}
    </div>
  )
}

export default GoalDetails