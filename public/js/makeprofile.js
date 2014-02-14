'use strict';

var male = false;
var female = false;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Javascript connected!");
    $(".photo a").click(function(e) {
        e.preventDefault();
    });
}

function toggleVisibility(className) {
    var visible = document.getElementsByClassName(className)[0].style.visibility;
    if (visible == "visible") visible = "hidden";
    else visible = "visible";
    document.getElementsByClassName(className)[0].style.visibility = visible;
}

function updateGenderForm() {
    var tag = genderTag();
    $(".gender-form").html(
            "<input type=\"hidden\" class=\"gender-tag\" value=\"" +
            tag + "\" name=\"gender\"/>"
            );
}