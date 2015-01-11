<?php

require_once __DIR__ . '/vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

function getCredentials()
{
    $fileContent = file_get_contents('../../../credentials.txt'); //read the file
    $credentials = explode("\n", $fileContent); //create array separate by new line

    return $credentials;
}

function setCredentialsConstants()
{
    $credentials = getCredentials();

    try {
        define('CONSUMER_KEY', $credentials[0]);
        define('CONSUMER_SECRET', $credentials[1]);
        define('ACCESS_TOKEN', $credentials[2]);
        define('TOKEN_SECRET', $credentials[3]);
    } catch (Exception $e) {
        throw $e;
    }

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

setCredentialsConstants();

$connection = getConnectionWithAccessToken();

$credentials = $connection->get(
    'account/verify_credentials'
);

$credentialsJson = json_encode((array) $credentials);

echo($credentialsJson);
