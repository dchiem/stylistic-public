'use strict';
var user_error = "Username is required."
var password_error = "Password is required."
var email_error = "Email is required."
var confirm_email_error = "Please confirm your email."
var birthday_error = "Birthday is required."

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Javascript connected!");
    $("#userInput").blur(function() {
        if (this.value.length == 0) {
            user_error = "Username is required."
        } else {
            checkExists(this.value);
        }
    });

    $("#passwordInput").blur(function() {
        if(this.value.length < 5 && this.value.length > 0) {
            password_error = "Password must be at least 5 characters long.";
            renderError(".passwordError", password_error);
        } else if(this.value.length == 0) {
            password_error = "Password is required.";
            noError(".passwordError");
        } else {
            password_error = "";
            noError(".passwordError");
        }
    });
    
    $("#emailInput").blur(function() {
        if (this.value.length == 0) {
            email_error = "Email is required.";
            noError(".emailError");
        } else if (!validateEmail(this.value)) {
            email_error = "Invalid email address.";
            renderError(".emailError", email_error);
        } else {
            email_error = "";
            noError(".emailError");
        }
    });

    $("#confirmEmailInput").blur(function() {
        if (this.value.length == 0) {
            confirm_email_error = "Please confirm your email."
            noError(".confirmEmailError");
        } else if (this.value != $("#emailInput").val()) {
            confirm_email_error = "Confirmation email does not match.";
            renderError(".confirmEmailError", confirm_email_error);
        } else {
            confirm_email_error = "";
            noError(".confirmEmailError");
        }
    });

    $("#birth-month").change(checkBirthday);
    $("#birth-day").change(checkBirthday);
    $("#birth-year").change(checkBirthday);
            
    $("#signupBtn").click(function(e) {
        checkBirthday();
        if (errors()) {
            showErrors();
            e.preventDefault();
        }
    });
}

function checkBirthday() {
    console.log("checking bday");
    var month = $("#birth-month").val();
    console.log("month: " + month);
    var day = $("#birth-day").val();
    var year = $("#birth-year").val();
    if (month != "#Month" && day != "Day" && year != "Year") {
        birthday_error = "";
        noError(".birthdayError");
    } else {
        birthday_error = "Birthday is required."
    }
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function errors() {
    if (user_error || password_error || email_error || confirm_email_error || birthday_error) {
        return true;
    } else {
        return false;
    }
}

function showErrors() {
    if (user_error) renderError(".userError", user_error);
    if (password_error) renderError(".passwordError", password_error);
    if (email_error) renderError(".emailError", email_error);
    if (confirm_email_error) renderError(".confirmEmailError", confirm_email_error);
    if (birthday_error) renderError(".birthdayError", birthday_error);
}

function checkExists(username) {
    console.log("checking if exists");
    $.ajax({
        url: '/alreadyExists',
        type: 'get',
        data: {username: username},
        success: function(d) {
            console.log("success!");
            renderUserError(d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
                   console.log("error!");
                   console.log(xhr.status);
                   console.log(thrownError);
               }
    });
}

function renderUserError(data) {
    if (data == "true") {
        user_error = "Username already exists.";
        renderError(".userError", user_error);
    } else {
        user_error = "";
        noError(".userError");
    }
}

function noError(className) {
    $(className).html("<br>"); 
}

function renderError(className, message) {
    $(className).html("<h5>> " + message + "</h5>\n");
}

