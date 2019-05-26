#Dropbox API Config
Below is the breakdown of how to setup the app to support the dropbox API. This should be quick and straight forward, We simply need to set some properties within the config and create an API Access token within dropbox.

---------------------------------------
### Create Access Token Within Dropbox




---------------------------------------
### Configure The Application
Now we need to set the desired options within our apps config file. To do this ensure you have the config in the root of the app open:
```
    sudo nano config.js
```
Then fill in the following properties:
| Property | Description | Value                 |
|----------|-------------|-----------------------|
| dropbox  | Configuration options for the dropbox side of the app. | Object  |
| dropbox.accessToken | The access token for the dropbox API within your account. | String |
| dropbox.baseDir | location within dropbox to place the uploaded files. | String ("") |
| dropbox.maxUploadSize  | The file size to dictate between a small file and a large file when using the API. Dropbox recommends 150mb. | Number (150 * 1024 * 1024) |
| dropbox.numToKeep | The number of files to keep within dropbox. This allows you to automate deletion of old backups. Set to false to keep all backups. | Number | Boolean (5) |

```
    ...,
    dropbox: {
        accessToken: "", // Dropbox API access token
        baseDir: "", // Dropbox base location for app
        maxUploadSize: 150 * 1024 * 1024, // Max upload size for Dropbox 150MB
        numToKeep: 5 // The number of items to keep within dropbox. Items beyond this are deleted after upload. (set to false to keep all)
    }
```
---------------------------------------
Thats it, we should now have the app setup to interact with the Dropbox API. Now we can return the the [Project Readme](https://github.com/craigpryde/server-backup-app) and continue from their.