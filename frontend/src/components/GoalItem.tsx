import { useAppDispatch } from "../store/store"
import { deleteGoals, } from "../store/slices/goalSlices"
import type { Goal } from "../store/slices/goalSlices"
import { Link } from "react-router-dom"
import {FiEye,FiX} from 'react-icons/fi'
interface GoalItemProps {
    goal:Goal;
}
 const GoalItem = ({goal}:GoalItemProps) => {
    const dispatch = useAppDispatch();
    const date = new Date(goal.createdAt).toLocaleDateString('en-US');
    // for georgian ka-GE
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-start justify-between gap-4 hover:shadow-md transition">
        <div className="min-w-0">
            <p className="text-xs text-gray-400 mb-1 font-mono">{date}</p>
            <h2 className="text-lg font-bold text-gray-800 wrap-break-words">{goal.text}</h2>
        </div>
        <div className="flex flex-row items-end gap-2 shrink-0">
            <Link 
            to={`/goals/${goal._id}`}
            className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-800"
            title="View"
            >
                <FiEye/>
            </Link>
            <button 
            onClick={() => dispatch(deleteGoals(goal._id))}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-gray-50 cursor-pointer">
                <FiX/>
            </button>
        </div>
    </div>
  )
}

export default GoalItem