//DataBase connection
require("./src/connect");

const app = require("./src/app");

const port = 4000;

app.listen(port, () => {
  console.log(`Server successfully started and listening on port ${port}`);
});
