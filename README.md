## FriendForecast *last readme edit: 8/24/2020*

Real-time weather data combines with social media to create deeper connections.  
See the working application here: https://immense-cove-75264.herokuapp.com/.

**Brand Statement**:  Weather can impact the way that we feel.  Users and the ones closest to them need the ability to check in.  Long-distance relationships and friendships are maintained
in a new dynamic by view real-time weather data wherever users are around the world.  

**How to use the site**:  Opening the website will ask for your permission to determine your location then take you to a user interface that loads current weather data for you based on information from (https://www.weatherapi.com/).  Users can view extended and hourly weather with a trend line for rain probability. A background image is also loaded which is grabbed from Google Places API (https://developers.google.com/places/web-service/photos) and set in view for styling.  Upon creating and account and logging in, users can add other friends who have created accounts, and when clicking on these accounts, they can view that user's current weather conditions.  A chat feature is also installed providing friends the ability to see when users are online, whether or not they have unread and also "missed" messages when they were offline.  

**Main Features**: 
- Geolocation and Google Places API for user coordinate updating and storage to database
- Hourly and 4-day forecast weather with graph for rain probability
- Real-time friend weather status and chat with websockets
- Mobile responsiveness for devices with screen widths less than 700 px

**Major technologies used**:  
- React JS
- Socket.io
- Node/Express/Mongoose
- Google Cloud API (Places)

**Next steps**:
- Incorporation of "warning" weather icons for inclement weather situations
- Suggested products based on user's trending weather conditions (i.e. warm clothing for users in winter conditions)
- ?Trend line for temperature
