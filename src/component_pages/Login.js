import React from 'react';
import FormGroup from "../components_utils/FormGroup";
import Navbar from "../components_utils/Navbar";
import { Validation } from "../helper/helper.js";
import { browserHistory } from "react-router";
const $ = require("jquery");

class Login extends React.Component {
    validateEmpty(e){
      //trigger validation for required empty fields
      Validation.validateEmpty($, e);
    }

    validateRequired(e){
      //when submit button is pressed, try to validate all inputs
      e.preventDefault();
      const form = $('form')
      const submitButton = document.getElementById("btnSubmit")
      const email = document.getElementById("email")
      const password = document.getElementById("password")
      const inputsToBeValidated = ["firstname", "lastname", "email", "password"]
      
      //validating required inputs
      Validation.validateRequired($, e, inputsToBeValidated, 'registration')
      
      //each of the fields below has validation's function when offFocus is triggered
      email.focus();  
      password.focus(); //offFocus from email, to trigger email's validation
      submitButton.focus(); //offFocus from password, to trigger password's validation

      // if form is valid, submit 
      if(form[0].checkValidity()){
        //return document.getElementById("loginForm").submit();
        return browserHistory.push("/")
      }
    }

    validatePassword(e){
      const notEmpty = Validation.validateEmpty($, e);
      if(!notEmpty){
        return;
      }
      // var regex = /^(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

      var password = e.target.value;
      var errorMessage = ""
      if(password.length <= 8){
        errorMessage = "Password must be at least 8 Character"
        $("#help-password").html(errorMessage)
        $("#password").addClass("error");
      }

      if(/(?=.*[A-Z])/.test(password)  === false){
        errorMessage = "At least one Capital letter";
        $("#help-password").html(errorMessage)
        $("#password").addClass("error");
      }  
      
    }


    validateEmail(e){
      const notEmpty = Validation.validateEmpty($, e);
      if(!notEmpty){ //if empty
        return;
      }

      const re =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if( re.test(e.target.value) === false ){
        const errorMessage = "not a valid email";
        $("#help-email").html(errorMessage)
        $("#email").addClass("error");
      }
    }



    render() {
        return(
            <div>
                <Navbar />
                <div className="container">
                	<form id="loginForm" name="registration" method="POST" action="/" 
                        style={{maxWidth: "400px", margin: "0 auto"}}>
                  <div className="">
                		    <FormGroup label="firstname"
                                   required={true} 
                                   autocomplete="fname"
                                   autofocus={true}
                                   offFocus={this.validateEmpty.bind(this)}/>
                        <FormGroup label="lastname"
                                   required={true} 
                                   autocomplete="lname"
                                   offFocus={this.validateEmpty.bind(this)}/>                                   
                        <FormGroup label="email" type="email"
                                   autocomplete="email"
                                   offFocus={this.validateEmail.bind(this)}
                                   required={true} />                                   
                        <FormGroup label="password" type="password"
                                   required={true}
                                   autocomplete="password"
                                   offFocus={this.validatePassword.bind(this)}
                                   pattern="^(?=.*[A-Z])[a-zA-Z0-9]{8,}$"/>
                        <br />
                        <h4>Biography: </h4>
                        <FormGroup label="Employer" />
                        <FormGroup label="Job Title" 
                                   id="jobTitle" 
                                   for="jobTitle"
                                   autocomplete="organization-title"/>
                        <FormGroup label="Birthday" 
                                   type="date"
                                   autocomplete="bday" />
                          
                        <br />
                        {/* Submit Button */}
                        <div className="form-actions">               
                    		  <button id="btnSubmit" className="btn btn-primary btn-large" 
                                 onClick={this.validateRequired.bind(this)}>Signup</button>
                        </div>
                  </div>
                	</form>
                </div>
            </div>
        );
    }
}

export default Login;
