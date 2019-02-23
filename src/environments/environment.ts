// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  service: 'firebase',
  config: {
    apiKey: 'AIzaSyAGEmbnS_y-oDCpm7bSAPR_OWm7gU0I8xY',
    authDomain: 'agilepiggybank.firebaseapp.com',
    databaseURL: 'https://agilepiggybank.firebaseio.com',
    projectId: 'agilepiggybank',
    storageBucket: 'agilepiggybank.appspot.com',
    messagingSenderId: '659019224665'
  },
  endpoint: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
