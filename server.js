let app = require("express")();
//let server = require("http").createServer(app);
var expressWs = require("express-ws")(app);
///let io = require("socket.io")(server);
const cors = require("cors");
app.use(cors());

app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    let msgJson = JSON.parse(msg);
    console.log(msgJson);
    ws.send(JSON.stringify({ event: "pong", data: "data" }));
  });
  console.log("socket", req.testing);
});

// io.on("connection", (socket) => {
//   console.log("called");
//   socket.on("disconnect", function () {
//     io.emit("usersActivity", {
//       user: socket.username,
//       event: "chatLeft",
//     });
//   });

//   socket.on("setUserName", (name) => {
//     socket.username = name;
//     io.emit("usersActivity", {
//       user: name,
//       event: "chatJoined",
//     });
//   });

//   socket.on("sendTheMessage", (message) => {
//     io.emit("message", {
//       msg: message.text,
//       user: socket.username,
//       createdAt: new Date(),
//     });
//   });
// });

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server start on ${port}`);
});
