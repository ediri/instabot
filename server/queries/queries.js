var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://admin:test@192.168.99.100:5432/instabot';
var db = pgp(connectionString);


function createUser(userJson, access_token) {
  userJson._json.data.access_token = access_token;
  return db.one('insert into "user" (id, username, full_name, profile_picture, bio, website, access_token ' +
    ') values (${id}, ${username}, ${full_name}, ${profile_picture}, ${bio}, ${website}, ${access_token}) returning *',
    userJson._json.data)
    .then(function (data) {
      console.log("Added User")
      return data;
    })
    .catch(function (error) {
      console.log(error)
    });
}

function getUserById(id) {
  return db.one('select * from "user" where id=$1', id)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log(error)
    });
}


module.exports = {
  createUser: createUser,
  getUserById: getUserById
  //getAllPuppies: getAllPuppies,
  //getSinglePuppy: getSinglePuppy,
  //createPuppy: createPuppy,
  //updatePuppy: updatePuppy,
  //removePuppy: removePuppy
};
