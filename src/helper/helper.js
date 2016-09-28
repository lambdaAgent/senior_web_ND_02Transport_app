
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
      var url = window.location.href;
      var query = "?"
      for (var key in obj){
          var value = obj.key;
          query += key + "=" +"value" + "&"
      }
      //take off the last &amp; from url
      return query.substring(0, query.length-1)
  }
}

module.exports = {
  Validation, Query
}