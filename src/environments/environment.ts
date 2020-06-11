// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  algolia: {
    appId: 'KOFQE47A1C'
  },
  firebase: {
    apiKey: 'AIzaSyAcYvQBIFsIvS24SKUvSLEzqkw_8QscCTM',
    authDomain: 'pokin-dev.firebaseapp.com',
    databaseURL: 'https://pokin-dev.firebaseio.com',
    projectId: 'pokin-dev',
    storageBucket: 'pokin-dev.appspot.com',
    messagingSenderId: '728841863194',
    appId: '1:728841863194:web:6a9d8a5322365c3c8711a3',
    measurementId: 'G-VRFYEH6CZS'
  },
  apiUrl: '/api',
  searchUrl: '/searchApiKey'
  // functionsUrl: 'https://us-central1-pokin-dev.cloudfunctions.net/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
