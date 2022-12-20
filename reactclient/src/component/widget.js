// import {} from "react";
import Mem from "./mem";
import Cpu from "./cpu";
import Info from "./info";
const Widget = () => {
  return (
    <div>
      <h1>Widget</h1>
      <Cpu />
      <Info />
      <Mem />
    </div>
  );
};

export default Widget;
