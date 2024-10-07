import "dotenv/config";
import { App } from "./server";
import "./shared/infrastructure/databases/mongoConnection";
import { AppRoutes } from "./shared/infrastructure/routes/AppRoutes";

const app = new App({
  port: 3000,
  routes: AppRoutes.routes,
});

app.start();
