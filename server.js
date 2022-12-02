let app = require("express")();
//let server = require("http").createServer(app);
var expressWs = require("express-ws")(app);
///let io = require("socket.io")(server);
let FCM = require("fcm-node");
const cors = require("cors");
const { response } = require("express");
let SERVER_KEY =
  "AAAAi-_-JYs:APA91bEiNVKYs0XwaSv_Gv5GO-1tXHrIWt37Ocm0jWK6usaIvCuGtrqBVsG0djhkWI6hIrELnOACD3VQ_zrrlAaXJCscpyCyRceMG1AJbiUHF6K3YY3MgzUDfR7WajwmQhljkRW9JcKu";

app.use(cors());
app.use(app.json());
app.use(app.urlencode({ extends: false }));

app.post("/fcm", async (req, res, next) => {
  try {
    let fcm = new FCM(SERVER_KEY);
    let message = {
      to: "/topic/" + req.body.topic,
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
    };
    fcm.send(message, (err, response) => {
      if (err) {
        next(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

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
