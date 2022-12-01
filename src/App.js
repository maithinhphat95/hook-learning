import { useEffect, useState } from "react";
import "./App.css";

// Hook useEffect:

//
/**
 Side Effects

 */

/**
   1. useEffect(callback)
   - Goi callback mỗi khi re-render 
   - Gọi callback sau khi component thêm element vào DOM
   2. useEffect(callback, [])
   - Chi goi callback 1 lan sau khi component mounted
   3. useEffect(callback, [deps])
   - Callback sẽ được gọi lại mỗi khi deps thay đổi
   - Nó sẽ kiểm tra deps trước và sau khi render có khác nhau k, nếu === thì nó gọi callback
   */

/**
 * 1. Callback luôn được gọi khi component mounted
 * 2. Clean up function luôn được gọi trước khi component unmounted
 * 3. Clean up function luôn được gọi trước khi callback được gọi
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
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [toTop, setToTop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [countdown, setCountdown] = useState(100);
  const [avatar, setAvatar] = useState();
  const [lessionId, setLessionId] = useState(1);

  useEffect(() => {
    // 1. Update DOM
    document.title = title;

    // 2. Call API
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  // 3. DOM event listen: chỉ cần add event listener 1 lần thì từ đó trở đi
  // mỗi khi event dc kich hoạt thì callback dc gọi
  useEffect(() => {
    const handleScroll = () => {
      setToTop(window.scrollY > 200);
      // khi scrollY > 200 thì setState liên tục, tuy nhiên k render lại. Do state === pre-state
    };
    // Event listener pham vi window, nên sẽ không bị unmount, bị rò rỉ bộ nhớ
    // Khi component mount lần nữa thì nó sẽ tạo thêm 1 event listener nữa
    // cần phải remove listener trước khi unmounted
    window.addEventListener("scroll", handleScroll);
    // 4. Remove event listener
    // Cleanup Funtion
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // // Resize Event
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Timer
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setCountdown((pre) => pre - 1);
  //   }, 1000);
  //   return () => clearInterval(timerId);
  // }, []);

  // Create new image Object
  useEffect(() => {
    // cleanup
    return () => {
      avatar && URL.revokeObjectURL(avatar?.preview);
    };
  }, [avatar]);

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);

    // Reset file
    e.target.value = null;
  };

  // Listen event fake chat
  useEffect(() => {
    const handleComment = ({ detail }) => {
      console.log(detail);
    };
    window.addEventListener(`lession-${lessionId}`, handleComment);
    return () => {
      window.removeEventListener(`lession-${lessionId}`, handleComment);
    };
  }, [lessionId]);

  return (
    <div>
      <h1>Hello ae</h1>
      <h1>Width: {width}</h1>
      {/* <h1>Countdown: {countdown}</h1> */}

      <input type="file" name="" onChange={handleChangeAvatar} />
      {avatar && <img src={avatar.preview} alt="" width="80%" />}

      {/* {taps.map((tap) => (
        <button
          key={tap}
          style={type === tap ? { color: "#fff", background: "#333" } : {}}
          onClick={() => setType(tap)}
        >
          {tap}
        </button>
      ))} */}

      {/* Input Title */}
      {/* <input
        type="text"
        name=""
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}

      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul> */}

      <ul>
        {lessions.map((lession) => (
          <li
            key={lession.id}
            style={{
              color: lessionId === lession.id ? "red " : "#333",
            }}
            onClick={() => setLessionId(lession.id)}
          >
            {lession.name}
          </li>
        ))}
      </ul>
      {toTop && (
        <button
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
          }}
        >
          To Top
        </button>
      )}
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
