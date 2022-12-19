const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  macA: String,
  osType: String,
  upTime: Number,
  freeMemory: Number,
  totalMemory: Number,
  usedMemory: Number,
  memoryUsage: Number,
  cpuModel: String,
  cpuSpeed: Number,
  cpuLoad: Number,
});

module.exports = mongoose.model("MachineModel", machineSchema);
