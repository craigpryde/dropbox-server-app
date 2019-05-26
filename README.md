# Dropbox Server App
An application developed to be run as a background task on a server to backup all the sub directories as zip files within dropbox.

## Requirements
* Node.js
* NPM
* Git

## Supported Clients
* Google Drive
* Dropbox

## Usage
To get started clone the repo and place on your server. The recomended place for this is within the server root in a folder called tasks.
```
    mkdir /tasks && mkdir tasks/server-dropbox-app && cd /tasks/server-dropbox-app
```

create the required config file for the app from the config.sample.js file
```
    cp ./config.sample.js config.js
```
Add the relevant settings for your app

* [Drop Box Config](http://google.com)


Once complete set up the server to run the task in the background after a desired length of time.

Example with linux cron job:

```
    # Locate app root
    cd /tasks/server-dropbox-app

    # Install Modules
    npm install

    # Run the scheduler
    npm run schedule
```

The task will now run every day at midnight.

## License
Please refer to LICENSE(.md) for details.