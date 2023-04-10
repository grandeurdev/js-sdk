# Guidelines in Node.js


This Node.js API has deprecated the login and register methods. This means that these methods are no longer supported and should not be used in any new development work.

## Purpose of the API

The API has been designed to be used for administration level operations only. It is not intended to be used on a lower level. This means that it should only be used by administrators who have the necessary permissions and access to perform these operations.

## Alternative Methods

If you are looking to implement, we recommend that you use the Token function. Provide it with an Auth token generated from Grandeur Dashboard.

## License

This project is licensed under the MIT license. Please see the LICENSE file for more information.
