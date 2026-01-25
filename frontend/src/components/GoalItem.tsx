import { useAppDispatch } from "../store/store"
import { deleteGoals, } from "../store/slices/goalSlices"
import type { Goal } from "../store/slices/goalSlices"

interface GoalItemProps {
    goal:Goal;
}
 const GoalItem = ({goal}:GoalItemProps) => {
    const dispatch = useAppDispatch();
    const date = new Date(goal.createdAt).toLocaleDateString('en-US');
    // for georgian ka-GE
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center relative group hover:shadow-md transition duration-300">
        <div>
            <p className="text-xs text-gray-400 mb-1 font-mono">
            {date}
            </p>
        <h2 className="text-lg font-bold text-gray-800 break-all">{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoals(goal._id))}
            className="text-gray-400 hover:text-red-600 font-bold p-2 rounded transition cursor-pointer"
            title="Remove"
            >
            X
        </button>
        </div>
    </div>
  )
}

export default GoalItem