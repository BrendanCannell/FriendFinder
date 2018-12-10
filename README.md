# FriendFinder

This turned out to be pretty straightforward, with a caveat: Because of time constraints, I didn't feel up to creating the front end from scratch, so I just copy-pasted the demonstration site. However I did rewrite parts of it, mainly in `survey.html`, to improve DRYness and general clarity. I also added a link near the bottom of both pages that resets `friends.json` to some example data. There's a handler to go with it in `apiRoutes.js`.

Also in `apiRoutes.js`, I tried out `ramda`, a library that provides various functional utilities. It's nice.