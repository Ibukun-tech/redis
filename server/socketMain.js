const mongoose = require("mongoose");
const machineModel = require("./model/machineModel");
mongoose
  .connect("mongodb://localhost:27017/perfData")
  .then(() => {
    console.log("its connected");
  })
  .catch((err) => {
    console.log(err);
  });
const socketMain = (io, socket) => {
  let macA;
  console.log("someone just connected");
  // socket.on("client", "react just connected");
  socket.on("initPerData", async (data) => {
    macA = data.macA;
    // await machineModel.create({ ...data });
    const valFromDatabase = await checkAndFind(data);
    console.log(valFromDatabase);
  });

  socket.on("perfData", (data) => {
    // console.log(data);
    io.to("ui").emit("data", data);
  });
};

function checkAndFind(data) {
  return new Promise((resolve, reject) => {
    machineModel.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err;
      } else if (doc === null) {
        let machine = new machineModel(data);
        machine.save();
      } else {
        resolve("not found");
      }
    });
  });
}
module.exports = socketMain;
