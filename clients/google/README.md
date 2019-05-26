# Google Drive API Config
Below is the breakdown of how to setup the app to support the Google Drive API. This should be quite straight forward, We simply need to set some properties within the config and create an API service key within Google API Console.

---------------------------------------

### Create Service Key Within Google API Console
In order to use the API without OAuth we need to create a service account. This will allow us to copy files to google drive without the need to authenticate in a browser window. By creating a service account we will be provited a private-key json file that we can use to authenticate between the server and the Google API's.

1. Create A Google App: https://console.developers.google.com/projectcreate
    * Name The Project.
    * Select Location if required.
    * Create the App.

2. Enable API: https://console.developers.google.com/apis/library/drive.googleapis.com
    * Enable The API

3. After Redirect - Click Credentials in the elft hand menu.
    * Click the link for ["Credentials in API's & Services"](https://console.developers.google.com/apis/credentials) located under the title.

4. Select Create Credentials
    * Select Service account key.
    * Select New service account.
    * Type in a service account name.
    * Set role as project -> owner.
    * Set key type as JSON
    * Click Create

5. Download the JSON File from google (this should automatically prompt for download).

6. Upload the file to the root of the server-backup-app directory and rename to "private-key.json". 

Service to service auth.

---------------------------------------
### Set Up Shared Folder For Service Account
Now due to API using a service account to authenticate we currently dont have the ability to upload files to our own personal Google Drive account, meaning we have no way to view the files we upload.

To fix this we need to setup a shared folder within our own drive and add the service account as a admin to the folder. This will then allow us to specify the shared folder as the baseDir for the files to be uploaded. 

By having a shared folder, anything the service account uploads will be stored on and accessible to your personal drive account.

1. Open the private-key.json file and copy the client_email property value:
    ```
        nano private-key.json
        
        // copy the value of client_email.
    ``` 
2. Set up shared folder within youir personal google drive.
3. Right click the folder and click share. 
4. Set the permissions to "edit" and paste the service account email we copied in step 1.
5. Click Send

We have now finished setting up the service account to allow files to be uploaded to our own drive folder. This will now mean that every upload the app makes will be stored within that shared folder and accessible to your personal account.

---------------------------------------
### Configure The Application
Now we need to set the desired options within our apps config file. To do this ensure you have the config in the root of the app open:

```
    sudo nano config.js
```

First of all we need to import the API private key from the project root, We can do this at the top of the config with an Es6 import:
```
    import key from "./private-key.json";
```

Then fill in the following properties:

| Property | Description | Value                 |
|----------|-------------|-----------------------|
| google  | Configuration options for the google side of the app. | Object  |
| google.key | The imported JSON Object provided by google (private-key.json). | Object |
| google.baseDir | location within google to place the uploaded files. (this is our shared folder ID) | String ("") |
| google.numToKeep | The number of files to keep within drive. This allows you to automate deletion of old backups. Set to false to keep all backups. | Number / Boolean |

To get the ID of the shared folder to set as the baseDir, We simply opne the folder in our broweser within drive and copy the id from the URL.
```
https://drive.google.com/drive/folders/1uy5vWCgkgx9qqTFkuE_6ScUrls_80GDR 
Would be id: 1uy5vWCgkgx9qqTFkuE_6ScUrls_80GDR
```
```
    ...,
    google: {
        key,
        baseDir: "1uy5vWCgkgx9qqTFkuE_6ScUrls_80MUR",
        numToKeep: 5
    },
```
---------------------------------------
Thats it, we should now have the app setup to interact with the Google Drive API. Now we can return the the [Project Readme](https://github.com/craigpryde/server-backup-app) and continue from their.