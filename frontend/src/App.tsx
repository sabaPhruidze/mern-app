import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-50 h-50 bg-green-500">
      <p>Hi how are you</p>
    </div>
  );
}

export default App;
