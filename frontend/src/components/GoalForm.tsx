import { useState } from "react"
import { useAppDispatch } from "../store/store"
import { createGoal } from "../store/slices/goalSlices"
const GoalForm = () => {
    const [text,setText] = useState('');
    const dispatch = useAppDispatch();

    const onSubmit =(e:React.FormEvent) => {
        e.preventDefault();
        if(!text) {
            alert('Please add a text');
            return;
        }
        dispatch(createGoal({text}));
        setText('')
    }
  return (
    <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-8">
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
                <label htmlFor="text" className="sr-only">Goal</label>
                <input 
                type="text"
                name="text"
                id="text"
                value={text}
                placeholder="What is your Goal?"
                onChange={e => setText(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                />
            </div>
            <button type="submit"
            className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition cursor-pointer active:scale-95"
            >Add Goal</button>
        </form>
    </section>
  )
}

export default GoalForm