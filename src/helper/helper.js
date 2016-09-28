
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

module.exports = {
  Validation
}