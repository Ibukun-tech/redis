const os = require("os");
const { resolve } = require("path");
const { uptime } = require("process");
const io = require("socket.io-client");
const socket = io("http://127.0.0.1:2000");
// Required to get the cpu details
socket.on("connect", () => {
  // console.log("you have connected to the backend server");
  const networkInterface = os.networkInterfaces();
  let macA;
  for (let keys in networkInterface) {
    if (!networkInterface[keys][0].internal) {
      macA = networkInterface[keys][0].mac;
      break;
    }
  }
  cpuPerformance().then((data) => {
    // console.log(data);
    socket.emit("initPerfData", data);
  });
  // socket.emit("initPerData", );
  let perfDataInterval = setInterval(() => {
    cpuPerformance().then((data) => {
      // console.log(data);
      data.macA = macA;
      socket.emit("perfData", data);
    });
  }, 1000);
  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
  });
});
function cpuPerformance() {
  return new Promise(async (resolve, reject) => {
    const cpu = os.cpus();
    // operating system type
    const osType = os.type();
    console.log(osType);
    // uptime
    const upTime = os.uptime();
    console.log(upTime);
    // free memory
    const freeMemory = os.freemem();
    // total memory
    const totalMemory = os.totalmem();
    // current Memory usage
    const usedMemory = freeMemory - totalMemory;

    const memoryUsage = Math.floor((usedMemory / totalMemory) * 100) / 100;

    // cpu type
    const cpuModel = cpu[0].model;
    // cpu speed
    const cpuSpeed = cpu[0].speed;
    const cpuLoad = await getCpuLoad();
    resolve({
      cpu,
      osType,
      upTime,
      freeMemory,
      totalMemory,
      usedMemory,
      memoryUsage,
      cpuModel,
      cpuSpeed,
      cpuLoad,
    });
  });
}
// we need the average od the cores which will give us the cpu average
function cpuAverage() {
  const cpu = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpu.forEach((core) => {
    for (val in core.times) {
      totalMs += core.times[val];
    }
    idleMs += core.times.idle;
  });
  return {
    idle: idleMs / cpu.length,
    total: totalMs / cpu.length,
  };
}
// console.log(cpuAverage());
function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;
      console.log(idleDifference, totalDifference);
      const percentageCpu =
        100 - Math.floor(100 * (idleDifference / totalDifference));
      resolve(percentageCpu);
    }, 100);
  });
}
cpuPerformance().then((data) => {
  // console.log(data);
});
