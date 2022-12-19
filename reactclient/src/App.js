import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import socket from "./utilities/socketConneection";
function App() {
  const [perfData, setPerfData] = useState({});
  useEffect(() => {
    socket.on("perfData", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
