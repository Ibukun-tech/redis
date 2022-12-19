const express = require("express");
const cluster = require("cluster");
const net = require("net");
const socketIo = require("socket.io");
const socketMain = require("./socketMain");
const port = 2000;
const processes = require("os").cpus().length;

const io_redis = require("socket.io-redis");
const farmHash = require("farmhash");
// console.log(cluster);
if (cluster.isMaster) {
  let workers = [];
  let spawn = function (i) {
    workers[i] = cluster.fork();
    workers[i].on("exit", function (code, signal) {
      spawn(i);
    });
  };
  for (let i = 0; i < processes; i++) {
    spawn(i);
  }
  const worker_index = function (ip, len) {
    return farmHash.fingerprint32(ip) % len;
  };
  const server = net.createServer({ pauseOnConnect: true }, (connection) => {
    let worker = workers[worker_index(connection.remoteAddress, processes)];
    worker.send("sticky-session:connection", connection);
  });
  server.listen(port);
  console.log(`master listening on ${port}`);
} else {
  let app = express();
  const server = app.listen(0, "localhost");
  const io = socketIo(server);
  io.adapter(io_redis({ host: "localhost", port: 6379 }));
  io.on("connection", (socket) => {
    socketMain(io, socket);
  });
  // socketMain(io, null);
  process.on("message", (message, connection) => {
    if (message !== "sticky-session:connection") {
      return;
    }

    server.emit("connection", connection);
  });
}
