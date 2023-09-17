export default function CounterButton({ by, incMethod, decMethod }) {

    // function incrementCount() {
    //     incMethod(by);
    // }

    // function decrementCount() {
    //     decMethod(by);
    // }

    return (
        <div>
            <button className="counterButton" onClick={() => incMethod(by)}>+{by}</button>
            <button className="counterButton" onClick={() => decMethod(by)}>-{by}</button>
        </div>
    );
}