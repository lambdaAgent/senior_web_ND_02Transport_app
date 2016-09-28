# Project02 - Transport-Planner App

### RUN:
1. cd build 
2. python -m simpleHTTPServer <port>

### Notes for build files:
1. final working files are in build directory, everything else are for development files 
2. needs localserver for react-router
3. library used: react-create-app, react-router
4. password: 
  * at least 8 characters
  * must include at least one Capital Letter
5. From project rubrics: "You do not need to create a real back-end or save user information, but the app must provide a form for users to create an account." <br/> 
   So,  I decide not to use any authentication, nor saving the new user account <br/>
**Signup form will route to "/" (homepage), after the user submit the form and pass all validation**
6. directory for build:
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
2. clone the repo, 
3. `$ npm install `  &nbsp;    *install dependencies*
4. `$ npm start `  &nbsp;  *to run in development mode*
5. there is only one **build** directory for production mode, **everything else are for development mode**
6. directory: 
   * /build        &nbsp;&nbsp; &nbsp;&nbsp;# build directory for production only, **everything else are for development mode**
   * index.html    &nbsp;&nbsp; # main html 
   * package.json
   * /node_modules
   * /src
     * /components &nbsp;&nbsp; # individual components
     * /helper
       * helper.js &nbsp;&nbsp; # helper functions
     * /events
       * eventList.js &nbsp;&nbsp; # pre-coded events database
     * favicon.ico
     * index.css
     * index.js &nbsp;&nbsp;  # app main entry
     * logo.svc
