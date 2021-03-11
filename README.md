API Rosetta Code
================

Inspired by [Rosetta Code][8], this repository is a community-powered collection of standalone samples of Twitter API resources implemented in several combinations of languages and libraries that abstract Twitter API access.

The samples are organized as follows:

    - samples
      |- use case 1
      |  |- language1-library1
      |  |- language1-library2
      |  |- language2
      |  \- language2-library-3
      \- use case 2
         \- ..

The script `build_index.py` relies on that directory structure to generate the javascript code that powers the website and dynamic filtering found at the [website][4].

## How to run a sample

* Copy `credentials.txt.sample` to `credentials.txt`
* Fill it with the API keys obtained at apps.twitter.com
* Choose the use case to learn at `samples` directory or the [website][4]
* Choose a language + library combination
* Follow the install and execute instructions
* Read the code
* Report found bugs

## Contributing

* Fork this repository
* Use the template directory found at `/samples/_template_` to create a new use case or sample
* Respect the directory organization and naming structure
* Implement code
* Document and test it, don't forget to add your info in the sample contributors section
* Run `build_script.py` to recreate the index for the website
* Send the pull request

### Important guidelines

* There must be clear instructions on how to install dependencies and execute it
* All samples must run as standalone code after following the instructions to build and install
* There should be a script or dependency manager to install dependencies, if applicable
* The sample code always load credentials from credentials.txt file
* The output must to be the raw JSON returned by the request, if applicable
* Keep use cases simple and short, one request only, single file (if possible)
* Don't abuse on code comments, but write a legible code

**Big thanks to our [contributors][9]!**

## Events

These were events organized to learn Twitter APIs with a specific language or platform.

*  `01/05/2015 ` [Node.js dojo][0] by [@NodeBR][1] and [@TwitterDevBR][2].
*  `01/06/2015 ` [PHPSP dojo][5] by [@phpsp][7] and [@TwitterDevBR][2].
*  `01/07/2015 ` [Fabric dojo][6] by Google Developer Group Sao Paulo and [@TwitterDevBR][2].

*This repository is a mirror copy from twitterdev version, given that it was removed from their org.*

[0]: http://www.meetup.com/NodeBR-Sao-Paulo/events/219499217
[1]: https://twitter.com/nodebr
[2]: https://twitter.com/twitterdevbr
[4]: http://twitterdev.github.io/api-rosetta-code
[5]: http://www.meetup.com/php-sp/events/219478835/
[6]: http://www.meetup.com/GDG-SP/events/219479086/
[7]: https://twitter.com/phpsp
[8]: http://rosettacode.org/wiki/Rosetta_Code
[9]: https://github.com/twitterdev/api-rosetta-code/graphs/contributors 
