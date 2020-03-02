
# Grandeur Cloud [![Version](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://cloud.grandeur.tech)
We are making it easier for you to build internet of things based smart products with our cloud platform and software development kit. [Let`s Sign Up] and create something amazing rightnow!
### API DOCUMENTATION
####  1. JavaScript SDK
JavaScript SDK provides functions which will be used to communicate with **Grandeur Cloud** from the front-end of your application.
JavaScript SDK currently supports 3 modules.
1. ##### Auth
Auth module provides major authentication functionalities.

 -  `login` (This function sends login a user request with required data to the server).
 -  `register` (This function sends verify code and register request with registration data to the server).
 -  `sendCode` (This function sends send code request with provided data to the server).
 -  `isAuthenticated` (This function sends check if a user`s logged in request with required data to the server).
 -  `logout` (This function sends logout the user request to the server).

2. ##### Device
Device module provides all the device functionalities.

 -  `pairDevice` (Method to send request for pairing a device with this User ID).
 -  `unpairDevice` (Method to unpair a device from the user ID).
 -  `getUserDevices` (Method to list all devices paired to user ID).
 -  `getOnlineDevicesCount` (Method to count all online devices paired to user ID).
 -  `getDeviceSummary` (Method to request a particular device`s summary).
 -  `getDeviceParms` (Method to request a particular device`s parms).
 -  `setDeviceSummary` (Method to update a particular device`s summary).
 -  `setDeviceParms` (Method to update a particular device`s parms).
 -  `getDeviceDetails` (Method to request a particular device`s details).
 -  `setDeviceName` (Method to update a particular device`s name).
 -  `getDeviceStatus` (Method to request a particular device`s online status).

3. ###### Storage
Storage module provides basic storage functionalities.

 -  `pairDevice` (Method to upload a file to the server`s file system).
 -  `getFileUrl` (Method to fetch a file from the server`s file system).



[Let`s Sign Up]: https://cloud.grandeur.tech





