import io from "socket.io-client";
let socket = io("http://localhost:2000");

// socket.on("connect", (data) => {
//   console.log(data);
// });

export default socket;
