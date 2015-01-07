<?php

require_once __DIR__ . '/vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

error_reporting(E_ALL);
ini_set('display_errors', 1);

function getCredentials()
{
    $fileContent = file_get_contents('../../../credentials.txt'); //read the file
    $credentials = explode("\n", $fileContent); //create array separate by new line

    return $credentials;
}

function setCredentialsConstants()
{
    $credentials = getCredentials();
    //set the credentials values in constants
    define('CONSUMER_KEY', $credentials[0]);
    define('CONSUMER_SECRET', $credentials[1]);
    define('ACCESS_TOKEN', $credentials[2]);
    define('TOKEN_SECRET', $credentials[3]);

    return true;
}

function getConnectionWithAccessToken()
{
    $connection = new TwitterOAuth(
        CONSUMER_KEY,
        CONSUMER_SECRET,
        ACCESS_TOKEN,
        TOKEN_SECRET
    );
    
    return $connection;
}

//set the credentials constants to start the script
setCredentialsConstants();

//get the twitter connection/twitterOAuth object
$connection = getConnectionWithAccessToken();

$userinfo = $connection->get(
    'users/show',
    ['screen_name'=> 'phpsp']
);

var_dump($userinfo);