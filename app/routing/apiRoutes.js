let R = require('ramda');
let express = require('express');
let util = require('util');
let fs = require('fs');
let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

let findClosest = (newFriend, friends) => {
  // The friend-finding algorithm described by the instructions is known as the "taxicab distance," among other names
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

module.exports = (toPath) => {
  let friendsPath = toPath("app/data/friends.json");
  let resetPath = toPath("app/data/reset.json");

  let router = express.Router();

  router.get("/api/friends", (req, res) => {
    res.sendFile(toPath("app/data/friends.json"));
  });

  router.post("/api/friends", async (req, res) => {
    try {
      let newFriend = R.pick(['name', 'photo', 'scores'], req.body);
      let friends = JSON.parse(await readFile(friendsPath));
      let closest = findClosest(newFriend, friends);

      res.send(R.pick(['name', 'photo'], closest));
      await writeFile(friendsPath, JSON.stringify([...friends, newFriend]));
    } catch (e) {
      console.log(e);
    }
  });

  router.delete("/api/friends", async (req, res) => {
    try {
      let resetData = await readFile(resetPath);
      await writeFile(friendsPath, resetData);
      res.send();
    } catch (e) {
      console.log(e);
    }
  })

  return router;
}