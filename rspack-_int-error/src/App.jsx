import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <motion.div className="title">
        <h1>Rspack + React</h1>
      </motion.div>
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Rspack and React logos to learn more
      </p>
    </div>
  );
}

export default App;
