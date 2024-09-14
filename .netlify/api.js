const express = require('express');
const serverless = require('serverless-http');
const app = express();
// const router = express.Router();
router.get('/', (req, res) => {
  res.send('App is running..');
});
app.use('/.netlify/functions/api', app); // path must route to lambda

module.exports.handler = serverless(app);
//const port = 8080;
//app.listen(process.env.PORT || port, () => {
//	console.log(`Listening on port ${port}`);
//});
