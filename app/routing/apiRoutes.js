let R = require('ramda');
let express = require('express');
let util = require('util');
let fs = require('fs');
let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

let findClosest = (newFriend, friends) => {
  // The friend-finding metric described by the instructions is known as the "taxicab distance," among other names
  let taxicabDistance = (arr1, arr2) => {
    let absoluteDifference = (a, b) => Math.abs(a - b);
    let diffs = R.zipWith(absoluteDifference, arr1, arr2);

    return diffs.reduce(R.add);
  }

  let distance = (friend) => taxicabDistance(friend.scores, newFriend.scores);
  let closer = R.minBy(distance);
  let closest = R.reduce(closer, friends[0], friends);

  return closest;
}

let valid = (friend) => true
  && friend.name && friend.photo && friend.scores
  && friend.scores.length === 10
  && friend.scores.every((score) => true
    && !isNaN(score) && score | 0 === score // integer?
    && score >= 1 && score <= 5)

module.exports = (filepaths) => express.Router()

  .get("/api/friends", (req, res) =>
    res.sendFile(filepaths.friends))

  .post("/api/friends", async (req, res) => {
    try {
      let newFriend = R.pick(['name', 'photo', 'scores'], req.body);
      if (!valid(newFriend)) throw "invalid";

      let friends = JSON.parse(await readFile(filepaths.friends));
      let closest = findClosest(newFriend, friends);

      res.send(R.pick(['name', 'photo'], closest));
      await writeFile(filepaths.friends, JSON.stringify([...friends, newFriend]));
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  })

  .delete("/api/friends", async (req, res) => {
    try {
      let resetData = await readFile(filepaths.reset);
      await writeFile(filepaths.friends, resetData);
      res.send();
    } catch (e) {
      console.log(e);
    }
  })