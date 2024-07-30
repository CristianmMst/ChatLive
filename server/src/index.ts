import "./database";
import "./passport";
import http from "http";
import cors from "cors";
import express from "express";
import routes from "./routes";
import passport from "passport";
import { Server } from "socket.io";
import { CLIENT_URL } from "./const";
import session from "express-session";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.use(passport.initialize());
app.use(passport.session());

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

export const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("add-user", (id) => {
    onlineUsers.set(id, socket.id);
  });

  socket.on("send-msg", ({ to, message }) => {
    const sendTo = onlineUsers.get(to);
    if (sendTo) {
      socket.to(sendTo).emit("send-msg", message);
    }
  });
});

server.listen(3000, () => console.log("listening on port 3000"));
