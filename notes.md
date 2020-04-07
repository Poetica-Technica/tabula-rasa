Needs:

- Front-end site - new repo in Org
  - Login/Logout
  - Form / Button to request a Poegram
  - Gallery of Poegrams (like Archillect)
    - Render Poegram JSON
  - About devs (project requirements?)

- Back-end route ('Create'? 'New'? 'Make'?) for making a Poegram request
  - /api/v1/create/?author=Shakespeare&format=Twitter
  - Query Parameters
    - Author
    - Title?
    - Category?
    - Text??? (custom Poegram)
    - Format
      - JSON (default?)
      - Image (JPG, PNG) - Where to store to display from?
      - Twitter (JPG/PNG at 1024x512)
      - Postcard (JPG/PNG at X x Y)
  - Parse query params, do GET requests to API, and create models

EOD Tuesday: Display all user's formatted Poegrams on front-end site?
  - Erin: Add front-end repo from repurposed Shakespeare project
  - Dorje: Route to create Poegram from request
  - Nathan: Formatting for image output

TA Q's:
  - Recommended storage service for Heroku? (S3?)

  // take newly formed poem and merge it with the user that requested it and make a poegram
  // the backend 
  // default user?? becuase we might not be doing auth
  
