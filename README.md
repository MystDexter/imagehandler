# imagehandler

For the purpose of this assessment I opted to explore the MEAN stack. I have zero experience developing with these Angular and Express prior to this, but I took this as a challenge to try my hands on something new and unfamiliar regardless of the outcome. The MEAN stack is one of those techs i wanted to dabble into but never really had the chance to, so I'm glad I got to play with it for this assessment.
What I have built is quite barebones and doesn't exactly fulfil all enhancements as outlined, but in the interest of time and not wanting to exceed the minimum time recommended, I've decided to submit what I have so far. It's not much, but I'm happy with what I've learned from it.

## What you will need

The REST API is developed with Express.js and served on Port 3000, and 

### To run express server:
From the project root
- Run npm install

- Open src/main.js. file. If you're on Visual Studio Code, run and debug in node.js environment.

- Enter http://localhost:3000 on your browser. Output should be "OK" if all is well. You should also be able see .bin/n/bin/node ./src/main.js in your debug console


The web client is developed built with Angular

### To run the web client
- in terminal run cd imagehandler-angular-client

- npm install

- npm start

- After compile, go to http://localhost:4200 on your browser

## API
API | Method | Description
--- | --- | ---
`file-upload` | POST | uploads a single image file
`multi-upload` | POST | Allows multiple image file upload
`zip-upload` | POST | Allows upload and extraction of files from compressed zip file
`file-list` | GET | Gets all uploaded image files

Use POSTMAN to test the REST API

# N/B
`A potentially leaner, simpler and more lightweight solution for implementing this would be using Handlebars (https://handlebarsjs.com/) to generate the views on the frontend instead of Angular, as well as mongodb for the database. This way we don't run a separate application to serve up our images in the browser. I'll be implementing this as personal learning in my spare time.`

