# Project02 - Transport-Planner App
1. This app will show schedule for caltrain's train
2. It will check the arrival-time of the next train 
3. This app utilize serviceWorker and indexedDB for offline capability
<a href="https://transportapp-udacity.herokuapp.com">See in action</a>


### RUN:
1. clone
2. npm install
3. To run client: 
   * cd build
   * python -m simpleHTTPServer *port*
4. Client app does not have initial data of each stations. It will need to fetch from server.
5. to run server: 
   * node ./SERVER/SERVER.js

### Notes for build files:
1. library used: react-create-app, react-router
2. All Components in Jsx are compiled into build directory
3. directory for build:
   * /build
     * index.html   &nbsp;&nbsp; # index.html for build
     * favicon.ico
     * sw.js  &nbsp;&nbsp; # **serviceWorker can be edited without compilation**
     * /images
     * /static
       * /css
       * /js      


### Notes for development files :
1. I use <a href="https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html">react-create-app</a> as a build tool, it uses webpack in background with very minimum configuration
2. there is only one **build** directory and server directory for production mode, **everything else are for development mode**
3. directory: 
   * /Server  &nbsp;&nbsp; # server files to serve stations_data in json format 
   * /build    &nbsp;&nbsp; &nbsp;&nbsp;# build directory for production only, 
   * -- **every files below are for development mode** --
   * /public   &nbsp;&nbsp; # main html and static assets
   * package.json
   * /node_modules
   * /src
     * /components_pages  &nbsp;&nbsp; # each pages: home.html, showStations.html
     * /components_utils  &nbsp;&nbsp; # components that are common among pages
     * /helper   &nbsp;&nbsp; # helper functions
     * /stations  &nbsp;&nbsp; # simple mem-cache functions
     * favicon.ico
     * index.css
     * index.js &nbsp;&nbsp;  # app main entry
     * logo.svc
