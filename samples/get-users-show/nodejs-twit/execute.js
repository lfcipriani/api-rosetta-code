#!/usr/bin/env nodejs

var fs = require('fs');
var Twit = require('twit');

// Check if there is a username in the command line
if (!process.argv[2]) {
  console.log('Usage: ./execute.js SCREEN_NAME');
  console.log('Example: ./execute.js TwitterDev');
  process.exit();
}

// Parsing the credential files
var credentials = fs.readFileSync(__dirname + '/../../../credentials.txt', 'utf8').split('\n');

// Creating the client
var client = new Twit({
  consumer_key: credentials[0],
  consumer_secret: credentials[1],
  access_token: credentials[2],
  access_token_secret: credentials[3]
});

// Get the user info
client.get('users/show', {
  screen_name: process.argv[2]
}, function(err, data) {
  if(err)
    throw err;

  console.log(data);
});
