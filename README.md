# Server Backup App
An application developed to be run as a background task on a server to backup all the sub directories of a desired location to a cloud service as zip files. 

Built with <3 using NodeJS

#### Supported Cloud Services
* Google Drive (API V3)
* Dropbox (API)

#### Requirements
* Node.js
* NPM
* Git

### Getting Started
To get started clone the repo and place it on your server. The recomended place for this is within the server root in a folder called tasks.
```
    sudo mkdir /tasks && cd /tasks

    sudo git clone https://github.com/craigpryde/server-backup-app.git
```
This will create a server-backup-app directory with the required files.
Now we need to make that folder our current working directory.
```
    cd server-backup-app
```
create the required config file for the app from the config.sample.js file
```
    sudo cp ./config.sample.js config.js
```

---------------------------------------

Lets set the core app settings:
```
    sudo nano ./config.js
```
| Property | Description | Value                 |
|----------|-------------|-----------------------|
| app      | Configuration option for the local side of the app.  | Object  |
| app.srcDir  | The source directory to be backed up.  |   String (__dirname + '../var/apps') |
| app.destDir | The location for the local back up to be stored. | String (__dirname + '/backups' |
| app.cleanUp | Dictates if the back up folder should be deleted after upload finishes |  true / false |
| app.ignore | Files / directories to be excluded from the archive. | Array |
| use | Identifies Which Service To Use | google / dropbox |

---------------------------------------
Now follow the intructions for your desired service to set up the config file.

| Service | Description | Docs |
|---------|-------------|------|
| Dropbox | Use the  Dopbox API to backup your files. | [Config Setup](https://github.com/craigpryde/server-backup-app/tree/master/clients/dropbox) |
| Google Drive | Use the Google Drive API to backup your files. | [Config Setup](https://github.com/craigpryde/server-backup-app/tree/master/clients/google) |

---------------------------------------
Once you complete the set up on the server, We want to schedule the task to run the background after a desired length of time.

Example with linux cron job:

```
    # Load sudo crontab
    sudo crontab -e

    # Add command to run every day at midnight
    0 0 * * * /usr/bin/node /tasks/server-backup-app/schedule.js

    # Save And Thats It, The Script will now run and backup the server each day at midnight.
```

The task will now run every day at midnight.

### License
Please refer to LICENSE(.md) for details.
