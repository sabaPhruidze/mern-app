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
    <section>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor=""></label>
                <input type="text" />
            </div>
            <button type="submit">Add Goal</button>
        </form>
    </section>
  )
}

export default GoalForm