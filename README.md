# Device Manager

*** Please read ***
I'm not used to work extensively with NodeJs and MongoDB, however, I wanted to face the challenge of completing this small project. So please, take it easy on me, I know there is a lot of room for improvement ;) I do accept tips and advices to be better every day, so don't hesitate on giving me feedback (alekosmp86@gmail.com). Thanks

*** How to ***
 - Clone this repo from Gitlab
 - Since I couldn't provide a script for restoring the database, please follow these steps:
    - Look for a file named "sampledata" in sampledata folder
    - Follow the instructions described in the file to create a local db and insert the data provided
 - Adjust values in the .env file to match your environment (database name, port for the app, etc)
 - Open cmd at project's root folder
   - Run "npm install" (without quotes) to download dependencies 
   - Run "node server.js" (without quotes) to start the server
 - Open browser and navigate to http://localhost:<APP_PORT> (defined in .env file)
 - Enjoy jumping between pages watching pretty buttons while creating/deleting entries in the database


Thanks for reading!