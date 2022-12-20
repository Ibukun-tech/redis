// import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import socket from "./utilities/socketConneection";
import Widget from "./component/widget";
socket.on("data", (data) => {
  console.log(data);
});
function App() {
  console.log(socket);

  socket.on("data", (data) => {
    console.log(data);
  });
  const [perfData, setPerfData] = useState(null);
  useEffect(() => {
    socket.on("data", (data) => {
      let currentValue;
      currentValue[data.macA] = data;
      setPerfData(currentValue);
      console.log(data);
    });
  });
  console.log(perfData);
  const widgets = [];
  widgets.push(perfData);
  return (
    <div className="App">
      {widgets.map((vals) => {
        <Widget key={vals.macA} body={vals.data} />;
      })}
    </div>
  );
}

export default App;
