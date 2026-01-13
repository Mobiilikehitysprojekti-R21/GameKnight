import createHttpServer from "./interfaces/http/server";


const userUseCases = require("./composition/user")();
const boardGameUseCases = require("./composition/boardGame")();


const app = createHttpServer({
  ...userUseCases,
  ...boardGameUseCases,
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
