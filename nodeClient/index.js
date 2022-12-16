const os = require("os");
const { uptime } = require("process");
// Required to get the cpu details
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
