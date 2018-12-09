let express = require('express');

module.exports = (toPath) => {
  let router = express.Router();
  
  router.get("/survey", (req, res) => {
    res.sendFile(toPath("app/public/survey.html"));
  })
  
  router.get("/", (req, res) => {
    res.sendFile(toPath("app/public/home.html"));
  })
  
  router.get("*", (req, res) => {
    res.redirect("/");
  })

  return router;
};