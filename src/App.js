import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";

/**
 1. Lưu các giá trị qua 1 tham chiếu bên ngoài
 2. Function Component
 */

function Content() {
  const [count, setCount] = useState(60);

  const timerId = useRef();
  const prevCount = useRef();
  // Lưu DOM element
  const h1Ref = useRef();

  // useEffect sẽ chạy sau khi component dc mouted, nên nó sẽ render xong
  // rồi mới xử lý gán giá trị cho ref current. đến khi render lần nữa thì render lại trễ 1 nhịp
  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    // console.log(h1Ref.current);
    // Lưu tọa độ
    const rect = h1Ref.current.getBoundingClientRect();
    console.log(rect);
  }, []);

  const handleStart = () => {
    // Start
    timerId.current = setInterval(() => {
      setCount((pre) => pre - 1);
    }, 1000);
    console.log("start -", timerId.current);
  };

  const handleStop = () => {
    // Stop
    clearInterval(timerId.current);
    console.log("stop -", timerId.current);
  };

  return (
    <div>
      <h1>Hello ae</h1>
      <h1 ref={h1Ref}>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
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
