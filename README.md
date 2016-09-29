# Project02 - Transport-Planner App

### RUN:
1. clone
2. npm install
3. To run client: 
   * cd build
   * python -m simpleHTTPServer *port*
4. Client app does not have initial data of each stations. It will fetch from local-server
5. to run server: 
   * node ./Server/SERVER.js

### Notes for build files:
1. library used: react-create-app, react-router
2. All Components in Jsx are compiled into build directory
3. directory for build:
   * /build
     * /static
       * /css
         * main.be08d7cd.css  &nbsp;&nbsp; # compiled css
       * /js      
         * main.6b0807af.js   &nbsp;&nbsp; # compiled build javascript
       * index.html           &nbsp;&nbsp; # index.html for build
       * favicon.ico

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
