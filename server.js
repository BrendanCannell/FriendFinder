let express = require('express');
let path = require('path');

let toPath = (relativePath) => path.join(__dirname, relativePath);
let filepaths = {
  home: toPath("app/public/home.html"),
  survey: toPath("app/public/survey.html"),
  friends: toPath("app/data/friends.json"),
  reset: toPath("app/data/reset.json"),
}

let PORT = process.env.PORT || 3000;

express()

  // Parse request body as JSON
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  // Import routes and give the server access to them.
  .use(require("./app/routing/apiRoutes")(filepaths))
  .use(require("./app/routing/htmlRoutes")(filepaths))

  .listen(PORT, () => console.log("App now listening at localhost:" + PORT));