# Vibe Society

Vibe Society is an app for music lovers around the world and is designed to enhance their concert/festival experiences while providing helpful resources and  utilities to plan their trips.

# Team Moonshot

Product Owner: Brian Chau

Scrum Master: Caity Opelka

Development Team: Brian Chau, Dow Edwards, Bethany Jones, Ryan Smith, Vincent Tong

# Application Walk Through

When users open the app they will be brought to our home screen where they will be presented with thumbnails different pages of our app and what it has to offer.

After logging in, the user will have the option to visit each page according to their needs.

Located at the top right of every page is a navigation burger menu which contains {x} options that will quickly navigate the user to various features of the application. From left to right are the ...

- ### Home
  The first page users will see will be our homepage. If they are not logged in, they will see a breakdown of our app's description & features. Once logged in, they will be presented with icons to bring them to different parts of the app.

- ### Find Events
  As a user who wishes to find music-related events happening around the world, our Find Events page will provide them with a listing of all events based on specific search criteria (ie: Artists/Event Name/Genre). The user can 'pin' events to save them to their account to revisit later. They can also select an event from the listings to be brought to our Event Details page.
    - ### Event Details
      This is a more expanded page for specific events that the user is interested in. In it, users will find more information regarding the location, dates, and ticket purchasing information. The user also still has the ability to pin the event from this page.

      From here, the user can then navigate to either the Travel Information's page or the Event Feed.
<<<<<<< HEAD

=======
    
>>>>>>> 5bed72def098909a04f91bac6f7542fefd8db991
      - ### Travel Information
        If a user wishes to see what local travel accommodations are available for the location of their events, they will have access to all hotels in the area of the event with their ratings along with features and amenities.
      - ### Event Feed
        As events are happening, users will be able to post photos to a public feed to share their experiences with others who are interested in this event. Here, users can also comment on each others photos and interact with one another.

- ### Budgets
  After pinning events, users can then plan out their budget for that specific event. There are budget sections for a variety of common travel expenses such as Tickets, Food, Drinks, Parking, Merchandise, and Travel. Users can enter their allotted budgets and will be provided a total for their trip.

- ### Song Finder
  Our application also provides music-related features apart from trip planning. As a user, when they hear a song in public and wish to know more information about it. Our SongFinder will listen to a small clip of audio from their device and then find information related to that specific song such as it's name, the artist, the lyrics, and album name.

  If a user wishes to follow that specific artist, they can then hit the 'Add to Favorites' button to add it to their Favorite Artists page.

- ### Favorite Artists
  Here, users will find a list of all artists they've decided to follow. If they click on the artist again, they will be brought to an expanded view which talks about the artists Bio, provides their social media information, and will also provide a list of that artist's upcoming events.

  If users do not have any artists currently liked, they will be provided a list of recommended artists to follow to get started.

<<<<<<< HEAD
- ### Account
=======
- ### Account 
>>>>>>> 5bed72def098909a04f91bac6f7542fefd8db991
  On this page, a user can see their current profile. Here, they can update their social media links for public viewing. It will also contain their upcoming events that they've pinned along with any photos they have posted on Event Feeds. Clicking a photo from the feed will allow them to directly see the comments on their photo.

- ### Chat
  A direct messaging feature that enables user to message each other privately. Here users can send messages to one another and will render immediately. Users are also able to send emojis.

- ### Notifications
  As users receive comments on photos they have uploaded, they will receive notifications. Currently notifications are indicated by a badge that displays the amount of notifications they have. From the menu, a user can check their notification feed. New notifications are differentiated by the bold **new**. Once users check their feed, these notifcations will be considered read and not be accounted for in the notification badge. Users can also clear their feed in case it clutters their screen.

# Tech

- Javascript
- Node.js - Runtime Environment
- PostgreSQL - Database
- Prisma - ORM
- Axios - http Client
- Express - Server
- React-Router - Router library
- React - Framework
- Cloudinary - Image/Audio hosting library
- Material UI - styling library
- Passport/Google OAuth - Authentication
- AWS EC2 - Deployment Service
- AWS RDS - Relational Database Service
- eslint - Linter
- Webpack - Module Bundler
- TypeScript - javascript transpiler
- NGinX

### database:

<<<<<<< HEAD
We have a PostgreSQL database. We have all of our models located in prisma/schema.prisma.
=======
We have a PostgreSQL database. We have all of our models located in prisma/schema.prisma. 
>>>>>>> 5bed72def098909a04f91bac6f7542fefd8db991

### server:

We have an express server. It is set up in server/index.ts. All server sided files are being transpiled with TypeScript into the /dist folder.

### client:

Our client sided files are being bundled via webpack into our public/bundle.js file.

### authentication

Our authentication is handled with oauth and passport. Our passport and google strategy setup can be found in server/middleware/auth.js. Once logged in, the user has access to the whole site.

### apis

We used several external apis for this project:

- TicketMaster - Provided event information in a response object based on a variety of searchable criteria. Used to render information in our Event listings, Event Details, Event Feed, and  Favorite Artists features.

- last.fm - Used to receive information pertaining to specific artists to receive their bio information to display in the Favorite Artists page.

- AUDD.io - accurate music recognition API. Receives an audio file recorded from the users device and returns an object with several key information (song name, artist name, lyric information, album titles, etc.) regarding that song that is used in the SongFinder page. They have a short trial period to try it out and afterwards a payment plan is required. However, their Indie plan was $5 for 1000 requests for the month, which was much more than what we needed for our purposes.

- Cloudinary - https://cloudinary.com/documentation/image_upload_api_reference
   Media hosting site used to create url links for user-uploaded photos in the Event Feed and to create audio files for the SongFinder feature. It requires credentials, but the entire setup is free for what we've used in this project.

- TripAdvisor - API with hotel/travel information used to display hotel information based on location on our travel planning page.


<<<<<<< HEAD
### front-end

The front-end was built using React and React Router. In App.jsx we initialize our trail data so that upon refresh of trail profile, the most recent trail data is rendered. In that same file we route our links and routes for the app.

The HashRouter can be found in client/index.jsx

The styling is found in main.css and mapStyles.js.


# Dev Setup:

### Environment Variables Needed

#### Google Auth
- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=

#### Cloudinary & Image Hosting
- CLOUDINARY_NAME=
- CLOUDINARY_API_KEY=
- CLOUDINARY_API_SECRET=
- CLOUDINARY_URL=

#### Trail API
- X-RapidApi-Key=
- X-RapidAPI-Host=

#### AWS RDS Database (online DB)
- RDS_HOSTNAME=
- RDS_USERNAME=
- RDS_PASSWORD=
- RDS_PORT=
#### Weather API
- WEATHER=
#### Google Maps API
- REACT_APP_GOOGLE_MAPS_API_KEY=
=======
# Dev Setup:

## Environment Variables Needed

- #### Google Auth
  - GOOGLE_CLIENT_ID=
  - GOOGLE_CLIENT_SECRET=
  - GOOGLE_CALLBACK_URL=

- #### Cloudinary & Image Hosting
  - CLOUDINARY_NAME=
  - CLOUDINARY_API_KEY=
  - CLOUDINARY_API_SECRET=
  - CLOUDINARY_URL=


- #### AWS RDS Database (online DB)
  - DATABASE_URL=
  - DATABASE_USERNAME=
  - DATABASE_PASSWORD=
  - DATABASE_PORT=

- #### AUDD.io
  - AUDD_TOKEN=

- #### LASTFM (artist bio)
  - LASTFM_API_KEY=
  - LASTFM_SECRET=

- ### Trip Advisor (hotel/travel)
  - TRIP_ADVISOR_API_KEY=

>>>>>>> 5bed72def098909a04f91bac6f7542fefd8db991

## Google OAuth

Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. Your redirect URI should match what's in the server/middleware/auth file. These api keys go inside the .env file.

<<<<<<< HEAD
# Setting up Google Client Id and Secret
1. Navigate to Google cloud console and sign in
2. Create a new project within Google console

    i. Give the project a name and you can leave Location to No organization

3. Make sure to have the project selected
4. Navigate to OAuth Consent Screen

    i. Set User Type to External and create

    ii. Fill out required fields, save and continue

    iii. Add or Remove Scopes

    iiii. Select email and profile, update, save and continue

    v. Test Users: add user emails for testing purposes, save and continue

5. Navigate back to Credentials

    i. Create Credentials

    ii. Application Type: Web Application

    iii. Authorized redirect URIs: your local URI with the endpoint '/auth/google/callback' (example: http://localhost:5000/auth/google/callback)


=======
>>>>>>> 5bed72def098909a04f91bac6f7542fefd8db991
## AWS RDS DATABASE SETUP
- To create an online database to be accessible anywhere, you will need to have an AWS account and have IAM users set up.
- Then you will need to create a database through RDS. Save your username and password for the database. You will need them for the next step. https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateDBInstance.html
- Once your database is live, you will need to go to your RDS dashboard, go to Databases and access your live database. Retrieve the Endpoint, Port, and update your VPS security groups to include SSH requests from relevant IP addresses.
![RDS Setup](mockups/RDS-setup.png)
- To be able to see the live data in your database, you will want to download Mysql Workbench. https://dev.mysql.com/downloads/workbench/
- Once downloaded, create a mysql connection with any Connection Name and input your Endpoint as the Hostname, Port, the Username you created when you setup your Database, and the password. Click Test Connection to test whether the setup work. If it throws an error, you likely need to update your inbound security rules in your security group in the RDS dashboard.
![RDS Setup](mockups/RDS-setup-workbench.png)
- Update your .env with the Endpoint(HostName), Username, Password, and Port.
- Once your mysql connection works and your .env is completed, seed the database from your VScode terminal. You can then refresh your Schemas in the Workbench and see the TakeAHike Schema with the seeded tables. To view the data in that table, hover over it and click the far right spreadsheet icon.
![RDS Setup](mockups/RDS-setup-workbench2.png)

## Installation/Start-up

- First fork the repo and clone it to your local machine.
- Collect all env keys
- Run 'npm install' to install all dependencies
<<<<<<< HEAD
- (if using local mysql) Open mysql, create and use a database called 'TakeAHike'
- (if using RDS) Update .env to match your RDS specs
- Run 'npm run dev' to start Webpack
- Run 'npm run seed' to seed Database
- Run 'npm start' to run the server

### Known Bugs

-
-
-


## App Mockups
![Trips](mockups/takeahike-trips.png)
![Packing List](mockups/takeahike-quartermaster.png)
![Checklist](mockups/takeahike-checklist.png)
![Trails](mockups/takeahike-trails.png)
![Weather](mockups/takeahike-weather.png)
![Map](mockups/takeahike-map.png)
![Gallery](mockups/takeahike-gallery.png)
=======
- (if using RDS) Update .env to match your RDS specs
- Run 'npm run type' to start TypeScript transpiler
- Run 'npm run build' to run Webpack bundler
- Run 'npm start' to run the server
- (optional) run npx prisma studio to see the database in browser.

### Known Bugs
  - Event Feed
    - When users post photos, their avatars are rendered incorrectly. The app will display the incorrect user. Also this allows for users to edit/delete photos that are not theirs.



## App Mockups
>>>>>>> 5bed72def098909a04f91bac6f7542fefd8db991
