import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [pics, setPics] = useState([]);
  const [load, setLoad] = useState(false);

  let count = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const picPromises = [];
      setLoad(true);

      for (let i = 0; i < 18; i++) {
        picPromises.push(
          fetch("https://api.waifu.pics/sfw/waifu").then((res) => res.json())
        );
      }

      try {
        const picData = await Promise.all(picPromises);
        const picUrls = picData.map((data) => ({
          url: data.url,
          clicked: false,
          key: Math.random(),
        }));
        setLoad(false);
        setPics(picUrls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClicked = (picUrl) => {
    if (picUrl.clicked) {
      alert("You lost");
      count.current = 0;
    } else {
      picUrl.clicked = true;
      count.current++;
    }
    randomize();
  };

  const randomize = () => {
    const sorted = [...pics].sort(() => Math.random() - 0.5);
    setPics(sorted);
    console.log(pics);
  };

  return (
    <>
      {!load && <h3>Streak: {count.current} </h3>}
      <div className="pictures">
        {load && <p>Loading</p>}
        {pics.map((picUrl, key) => (
          <div className="pic">
            <img
              key={key}
              src={picUrl.url}
              style={{ width: "150px", maxHeight: "250px" }}
              alt={`Waifu `}
              onClick={() => handleClicked(picUrl)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
