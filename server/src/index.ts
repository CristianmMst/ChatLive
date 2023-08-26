import "./database";
import "./passport";
import http from "http";
import cors from "cors";
import express from "express";
import routes from "./routes";
import passport from "passport";
import { Server } from "socket.io";
import session from "express-session";

const app = express();
const server = http.createServer(app);
console.log(process.env["CLIENT_ID"]);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(passport.initialize());
app.use(passport.session());

const io = new Server(server, {
  cors: {
    origin: "https://chat-live-dun.vercel.app",
  },
});

export const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("add-user", (id) => {
    onlineUsers.set(id, socket.id);
    console.log("add user", socket.id);
  });

  socket.on("send-msg", ({ to, message }) => {
    const sendTo = onlineUsers.get(to);
    if (sendTo) {
      socket.to(sendTo).emit("send-msg", message);
    }
  });
});

server.listen(3000, () => console.log("listening on port 3000"));
