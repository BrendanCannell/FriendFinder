let express = require('express');
let path = require('path');
let root = __dirname;
let toPath = (relativePath) => path.join(root, relativePath);

let PORT = process.env.PORT || 3000;

let app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
let apiRoutes = require("./app/routing/apiRoutes")(toPath);
let htmlRoutes = require("./app/routing/htmlRoutes")(toPath);

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
