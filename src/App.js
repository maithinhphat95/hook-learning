import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";

/**
 Hook useEffect:
 1. Cập nhật State
 2. Cập nhật DOM (mutated)
 3. re-Render UI
 4. Gọi cleanup func nếu deps thay đổi
 5. Gọi useEffect callback
 */

/**
  Hook useLayoutEffect
  1. Cập nhật State
  2. Cập nhật DOM (mutated)
  3. Gọi cleanup nếu deps thay đổi (sync)
  4. Gọi useLayoutEffect callback (sync)
  5. Render lại UI
  */

const taps = ["posts", "comments", "albums"];
const lessions = [
  {
    id: 1,
    name: "aaaa",
  },
  {
    id: 2,
    name: "bbb",
  },
  ,
  {
    id: 3,
    name: "ccc",
  },
];
function Content() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  // UI sẽ render xong rồi mới chạy callback, lên 4 xong nháy 1 cái về 0
  // useEffect(() => {
  //   if (count > 3) {
  //     setCount(0);
  //   }
  // }, [count]);

  // Callback sẽ chạy trước khi render
  useLayoutEffect(() => {
    if (count > 3) {
      setCount(0);
    }
  }, [count]);

  return (
    <div>
      <h1>Hello ae</h1>
      <h1>{count}</h1>
      <button type="" onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

function App() {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className="app">
      <button type="" onClick={handleClick}>
        Toggle
      </button>
      {show && <Content />}
    </div>
  );
}

export default App;
