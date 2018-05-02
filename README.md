# Install:

Clone this repo and run `npm install` followed by `npm start`. Server will run on `localhost:3000`

# Reproducing the problem:

1.  In a browser navigate to `localhost:3000`
2.  Click the "Foobar!" link to generate an alert, and a console log of the event object.
3.  Uncomment line 53 of public/js/criteo.js
4.  Click on the "Home" and "Foobar!" links. You should not see an alert or a console log of the event object.

Tested on OS X 10.12.6 with Chrome 66.0.3359.139, Safari 11.1, and Firefox 59.0.2
