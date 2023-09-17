import { useState } from "react";
import CounterButton from "./CounterButton";
import "./Counter.css";

export default function Counter() {
    const [count, updateCount] = useState(0);

    function incrementCounterFunction(by) {
        updateCount(count + by);
    }

    function decrementCounterFunction(by) {
        updateCount(count - by);
    }

    function resetCounter() {
        updateCount(0);
    }

    return (
        <div>
            <span className="totalCounter">{count}</span>
            <CounterButton by={1} incMethod={incrementCounterFunction} decMethod={decrementCounterFunction} />
            <CounterButton by={2} incMethod={incrementCounterFunction} decMethod={decrementCounterFunction} />
            <CounterButton by={5} incMethod={incrementCounterFunction} decMethod={decrementCounterFunction} />
            <button className="resetButton" onClick={resetCounter}>RESET</button>
        </div>
    );
}
