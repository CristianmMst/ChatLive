import cors from "cors";
import http from "http";
import passport from "passport";
import { Server } from "socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";
import { CLIENT_URL } from "./shared/const";
import express, { Application, Router } from "express";
import { errorHandler } from "./shared/infrastructure/middlewares/errorHandler";

interface ServerOptions {
  port?: number;
  routes: Router;
}

export const onlineUsers = new Map();

export class App {
  private readonly port: number;
  private readonly routes: Router;
  private readonly app: Application = express();

  constructor({ port = 3000, routes }: ServerOptions) {
    this.port = port;
    this.routes = routes;
  }

  start() {
    const server = http.createServer(this.app);

    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: CLIENT_URL,
        credentials: true,
      }),
    );

    this.app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
      }),
    );

    this.app.use(express.json());
    this.app.use("/api", this.routes);

    this.app.use(errorHandler);

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    const io = new Server(server, {
      cors: {
        origin: CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling"],
    });

    io.on("connection", (socket) => {
      socket.on("add-user", (id) => {
        onlineUsers.set(id, socket.id);
      });

      socket.on("send-msg", (message) => {
        const sendTo = onlineUsers.get(message.to);
        if (sendTo) {
          socket.to(sendTo).emit("send-msg", message);
        }
      });
    });

    server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
