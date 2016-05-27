var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://admin:test@192.168.99.100:5432/instabot';
var db = pgp(connectionString);


function createUser(userJson, access_token) {
  userJson._json.data.access_token = access_token;
  console.log(userJson._json.data)
  db.none('insert into "user" (id, username, full_name, profile_picture, bio, website, access_token ' +
    ') values (${id}, ${username}, ${full_name}, ${profile_picture}, ${bio}, ${website}, ${access_token})',
    userJson._json.data)
    .then(function () {
      console.log("Added User")
    })
    .catch(function (err) {
      console.log(err)
    });
}


module.exports = {
  createUser: createUser
  //getAllPuppies: getAllPuppies,
  //getSinglePuppy: getSinglePuppy,
  //createPuppy: createPuppy,
  //updatePuppy: updatePuppy,
  //removePuppy: removePuppy
};
