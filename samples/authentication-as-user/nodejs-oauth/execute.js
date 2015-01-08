#!/usr/bin/env nodejs

var oauth = require('oauth');
var fs = require('fs');

// Parsing the credential files
var credentials = fs.readFileSync(__dirname + '/../../../credentials.txt', 'utf8').split('\n');

// Building the oauth client
var client = new oauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  credentials[0],
  credentials[1],
  '1.0A',
  null,
  'HMAC-SHA1'
);

// Make a request agains the API
client.get(
  'https://api.twitter.com/1.1/account/verify_credentials.json',
  credentials[2],
  credentials[3],
  function(err, data) {
    if(err)
      throw err;

    console.log(JSON.parse(data));
  });
