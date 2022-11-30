import { useEffect, useState } from "react";
import "./App.css";
function App() {
  // Hook useState

  /**
   1. useState() with initial callback: to run callback only 1 time
   2. setState() with calback and argument is previous value
   */

  const orders = [100, 200, 300];
  // Use callback in the initial to run only callback 1 time
  const [count, setCount] = useState(() => {
    const total = orders.reduce((total, cur) => total + cur);
    return total;
  });

  const handleIncrease = () => {
    // Set state with value: function vẫn chỉ nhận count và +1 duy nhất 1 lần.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const handleCallback = () => {
    // Set State with callback: callback trong setState sẽ trả về giá trị = giá trị trước đó + 1
    setCount((preValue) => preValue + 1);
    setCount((preValue) => preValue + 1);
    setCount((preValue) => preValue + 1);
  };
  return (
    <div className="app">
      <button type="" onClick={handleIncrease}>
        Increase Value
      </button>
      <button type="" onClick={handleCallback}>
        Increase Value by set CallBack
      </button>
      <h1>Count : {count}</h1>
    </div>
  );
}

export default App;
