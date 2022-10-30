import express from "express";

const PORT = process.env.PORT || 4000;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    // disconnect from the db

    console.log("Server DOWN...");
    console.log("Killed by: ", signal);

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
