// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const process = {
  env : {
    production: false,
    API_KEY_AUTH: 'KEY',
    URL_API_AUTH: 'URL',
    API_KEY_USER: 'KEY',
    URL_API_USER: 'URL',
    SEED_EXPIRE: 3600,
    TITULO_TOOLBAR : 'NOMBRE_PROYECTO'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
