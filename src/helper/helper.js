import Stations from "../stations/stations.js"
import Dexie from "dexie";

var db = new Dexie("TrainDatabase");
db.version(1).stores({
  stations: "id"
});

const FetchAPI = {
  _fetchInterval: undefined,
  fetchStationsFromServer(React){
        fetch("http://localhost:8888/getAllStationsFromServer")
          .then(res => res.json())
          .then(stations => {
            //put the data to indexedDB          
            return Dexie.Promise.all(
                stations.map(s => db.stations.put({
                  id: s.id,
                  zone: s.zone,
                  name: s.name,
                  Southbound: s.Southbound,
                  Northbound: s.Northbound,
                  vendors: s.vendors,
                  address: s.address,
                  amnesties: s.amnesties,
                  image: s.image
               }))
            )
            .then((arr) => {
                var stations = [];
                //then grab the data out of indexedDB
                db.stations.each(station => {
                    stations.push(station) 
                }).then(arr => {
                    //update react
                    Stations.replace(stations);
                    if(React) React.setState({stations: Stations.getAll() })
                })
            })//promise.all().then()
        })//fetch()
        .catch(err => {
            var cacheStations = [];
            this.stopFetching();
            
            //check if database exists
            Dexie.getDatabaseNames( (databaseNames) => {
              if (databaseNames.length === 0) {
                  // No databases at this origin as we know of.
                  return console.log("There are no databases at current origin. Try loading another sample and then go back to this page.");
              }

              //get from indexedDB
               db.open();
               return db.stations.each(s => {
                  cacheStations.push(s)
               })
            })
            .then( () => {
                if(Array.isArray(cacheStations) && cacheStations.length > 0) {
                    Stations.replace(cacheStations);
                }
                if(React) React.setState({stations: Stations.getAll() });
                db.close();
            })
           
        });
      
  },
  fetchStationsInterval(React){
    this._fetchInterval = setInterval( () => {
      this.fetchStationsFromServer(React)
    },3000)
  },
  stopFetching(){
    clearInterval(this._fetchInterval)
  }
  
}
const Validation = {
    validateRequired($, e, array, formname){
      e.preventDefault();
      const arr = array;

      arr.map((label) => {
        var errorMessage = "Please fill the form";
        var helpElem = "#help-"+label;
        var labelElem = "#"+label;
        var value = $(labelElem)[0].value;
        // console.log(labelElem, $(labelElem)[0].checkValidity())

        if( value === ""){
          $(helpElem).html(errorMessage)
          $(labelElem).addClass("error")
          return undefined;
        } else {
          $(helpElem).html("");
          $(labelElem).removeClass("error");
        }
      })    

     
    },

    validateEmpty($, e){
      var errorMessage = "Please fill the form";
      var helpElem = "#help-"+e.target.id;
      var labelElem = "#"+e.target.id;
      var value = e.target.value;
      if( value === ""){
        $(helpElem).html(errorMessage)
        $(labelElem).addClass("error")
        return false;
      } else {
        $(helpElem).html("");
        $(labelElem).removeClass("error");
        return true;
      }
    }
}

const Query = {

  convertQueryToObject(url){
      var queries = url.split("?")[1];
      var result = {}
      queries.split("&").map(q => {
          var key_value = q.split("=");
          result[key_value[0]] = key_value[1];
      });
      return result;
  },

  convertObjectToURL(obj){
      var url = window.location.href;
      var urlWithNoQuery = url.split("?")[0];
      return urlWithNoQuery + this.convertObjectToQuery(obj)
  },
  convertObjectToQuery(obj){
      var query = "?"
      for (var key in obj) {
          var value = obj[key];
          query += key + "=" + value + "&"
      }
      //take off the last &amp; from url
      return query.substring(0, query.length-1)
  }
}
const Cookie = {

  convertCookieToObject(cookie){
      var result = {}
      cookie.split("; ").map(q => {
          var key_value = q.split("=");
          result[key_value[0]] = key_value[1];
      });
      return result;
  },

  convertObjectToCookie(obj){
      var result = ""
      for (var key in obj){
          var value = obj[key];
          result += key + "=" + value + "; "
      }
      //take off the last ;<space> from url
      return result.substring(0, result.length-2)
  },
  addOrPutToCookie(cookie, obj){
    var _cookie = this.convertCookieToObject(cookie);
    for (var key in obj){
        _cookie[key] = obj[key]
    }

    return this.convertObjectToCookie(_cookie)
  }
}

module.exports = {
  Validation, Query, Cookie, FetchAPI
}