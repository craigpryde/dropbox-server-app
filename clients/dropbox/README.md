| Property | Description | Value                 |
|----------|-------------|-----------------------|
| app      | Configuration option for the local side of the app.  | Object  |
| app.srcDir  | The source directory to be backed up.  |   String (__dirname + '../var/apps') |
| app.destDir | The location for the local back up to be stored. | String (__dirname + '/backups' |
| app.cleanUp | Dictates if the back up folder should be deleted after upload finishes |  true / false |
| dropbox  | Configuration options for the dropbox side of the app. | Object  |
| dropbox.accessToken | The access token for the dropbox API within your account. | String |
| dropbox.baseDir | location within dropbox to place the uploaded files. | String ("") |
| dropbox.maxUploadSize  | The file size to dictate between a small file and a large file when using the API. Dropbox recommends 150mb. | Number (150 * 1024 * 1024) |
| dropbox.numToKeep | The number of files to keep within dropbox. This allows you to automate deletion of old backups. Set to false to keep all backups. | Number | Boolean (5) |

to edit the settings we open the config.js file within the app root.
```
    nano config.js
```
```
    export default {
    app: {
        srcDir: __dirname + "/test", // Source of directories to be backed up.
        destDir: __dirname + "/backups", // Local destination folder for zipped backups
        cleanUp: true // Should the app clean up the local backups
    },
    dropbox: {
          accessToken: "", // Dropbox API access token
          baseDir: "", // Dropbox base location for app
          maxUploadSize: 150 * 1024 * 1024, // Max upload size for Dropbox 150MB
          numToKeep: 5 // The number of items to keep within dropbox. Items beyond this are deleted after upload. (set to false to keep all)
        }
    }
```