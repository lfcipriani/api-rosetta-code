#!/usr/bin/env nodejs

var oauth = require('simple-oauth2');
var fs = require('fs');

// Configuring credentials
var credentials = fs.readFileSync(__dirname + '/../../../credentials.txt', 'utf8').split('\n');

var keys = {
  clientID: credentials[0],
  clientSecret: credentials[1],
  site: 'https://api.twitter.com',
  tokenPath: '/oauth2/token'
};

// Creating the client
var twitter = oauth(keys);

// Retrieve the token
twitter.client.getToken({}, function(err, result){
  if(err)
    throw err;

  var auth = twitter.accessToken.create(result);

  // Get user info
  twitter.api('GET', '/1.1/users/show.json?screen_name=twitter', {
    access_token: auth.token.access_token
  }, function(err, result){
    if(err)
      throw err;

    console.log(result);
  });
});
