let express = require('express');

module.exports = (filepaths) =>
  express.Router()

    .get("/survey", (req, res) =>
      res.sendFile(filepaths.survey))

    .get("/", (req, res) =>
      res.sendFile(filepaths.home))

    .get("*", (req, res) =>
      res.redirect("/"))