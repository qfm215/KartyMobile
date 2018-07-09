## Installation

*	**Clone and install packages**
```
git clone git@github.com:qfm215/KartyMobile.git
cd KartyMobile
yarn
```

*	**Run on iOS**
	*	Opt #1:
		*	Run `npm start` in your terminal
		*	Scan the QR code in your Expo app
	*	Opt #2:
		*	Run `npm run ios` in your terminal


*	**Run on Android**
	*	Opt #1:
		*	Run `npm start` in your terminal
		*	Scan the QR code in your Expo app
	*	Opt #2:
		*	Make sure you have an `Android emulator` installed and running
		*	Run `npm run android` in your terminal

*	**TroubleShooting**
    * Opt #1:
        * If the app stay blocked on the message `Starting packager...`
        run the command 
        `watchman watch-del-all && watchman shutdown-server`
