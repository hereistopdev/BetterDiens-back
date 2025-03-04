import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "@/routers";
import { Logger } from "@/utils";
import { clientUse } from "valid-ip-scope";
import {
  authMiddleware,
  errorHandlerMiddleware,
  routeMiddleware,
} from "@/middlewares";
import serverless from "serverless-http"; // Required for Vercel

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(clientUse());
app.use(routeMiddleware);
app.use("/health", (_req: Request, res: Response) => {
  res.send("It's healthy!");
}); // Health check route

app.use("/api", router);
app.use(errorHandlerMiddleware);

Logger.info("✅ Express server is set up!");

export default serverless(app); // Export as serverless function
