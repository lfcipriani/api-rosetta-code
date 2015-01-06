API Rosetta Code
================

A collection of standalone samples of Twitter API resources implemented in several languages and combinations of libraries that abstract Twitter API access.

The samples are organized as follows:

    - samples
      |- use case 1
      |  |- language1-library1
      |  |- language1-library2
      |  |- language2
      |  \- language2-library3
      \- use case 2
         \- ..

This is a working in progress, your contribution is more than welcomed.

## Quick start

* Copy `credentials.txt.sample` to `credentials.txt`
* Fill it with the API keys obtained at apps.twitter.com
* Choose the use case to learn at `samples` directory
* Choose a language + library combination
* Follow the install and execute instructions
* Read the code
* Report found bugs

## Contributing

* All samples must run as standalone code
* There must be clear instructions on how to install dependencies and execute it
* There should be a script or dependency manager to install dependencies
* The sample code always load credentials from credentials.txt file
* The output must to be the raw JSON returned by the request
* Keep use cases simple and short, one request only, single file (if possible)
* Don't abuse on code comments, but write a legible code
* Reuse the template folder to create new use cases or samples

## Next dojos

*  `01/05/2015 ` [Node.js dojo][0] by [@NodeBR][1] and [@TwitterDevBR][2].

[0]: http://www.meetup.com/NodeBR-Sao-Paulo/events/219499217
[1]: https://twitter.com/nodebr
[2]: https://twitter.com/twitterdevbr
