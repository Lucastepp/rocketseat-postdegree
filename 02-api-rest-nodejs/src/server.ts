import { env } from "./env";
import { app } from "./app";

app
  .listen({
    port: env.PORT,
  })
  .then(function () {
    console.log("Server is running on port 3333");
  });
