import io from "socket.io-client";
let socket = io.connect("http://localhost:2000");

export default socket;
