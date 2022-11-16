import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";
import { CORS_ORIGIN } from "./constants";
import userRoute from "./modules/user/user.route"
import authRoute from "./modules/auth/auth.route";
import deserializeUser from "./middleware/deserializeUser";

const PORT = process.env.PORT || 4000;

const app = express();

// -- middlewares --
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet());
app.use(deserializeUser)

app.use('/api/users/', userRoute)
app.use('/api/auth/', authRoute)

const server = app.listen(PORT, async () => {
  await connectToDatabase();

  logger.info(`Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    // disconnect from the db
    await disconnectFromDatabase();

    logger.info("Server down...");
    logger.info("Killed by: " + signal);

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
