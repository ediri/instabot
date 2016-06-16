var express = require('express');
var rp = require('request-promise');
var router = express.Router();

/* GET home page. */


function getUserDetailsFromInstagram(req, cb) {
  rp({
    uri: 'https://api.instagram.com/v1/users/self/',
    qs: {access_token: req.user.access_token},
    json: true
  }).then(function (user) {
    console.log(user);
  });
}


router.get('/', function (req, res) {
  console.log();
  if (req.user) {
    getUserDetailsFromInstagram(req, function () {

    });
  }
  res.render('index', {title: 'Express', user: req.user});
});

module.exports = router;
