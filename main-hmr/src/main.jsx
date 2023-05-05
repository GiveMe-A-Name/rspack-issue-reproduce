import React from 'react'
import ReactDOM from 'react-dom/client'
import reactLogo from "./assets/react.svg";
import "./App.css";
import App from './App'
import './index.css'

function App1() {
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React Test App1212</h1>
      <p className="read-the-docs">
        Click on the Rspack and React logos to learn more
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <App1 />
  </React.StrictMode>
)
