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
    $(".male a").click(function(e) {
        console.log("male tag clicked");
        e.preventDefault();
        male = !male;
        updateGenderForm();
        toggleVisibility("male checkedOverlay");
        if (!male & !female) {
            setVisibility("tag-stuff", "hidden");
        } else {
            setVisibility("tag-stuff", "visible");
        }
        console.log(genderTag());
    });
    $(".female a").click(function(e) {
        console.log("female tag clicked");
        e.preventDefault();
        female = !female;
        updateGenderForm();
        toggleVisibility("female checkedOverlay");
        if (!male & !female) {
            setVisibility("tag-stuff", "hidden");
        } else {
            setVisibility("tag-stuff", "visible");
        }
        console.log(genderTag());
    });
}

function toggleVisibility(className) {
    var visible = document.getElementsByClassName(className)[0].style.visibility;
    if (visible == "visible") visible = "hidden";
    else visible = "visible";
    setVisibility(className, visible)
}

function setVisibility(className, visible) {
    document.getElementsByClassName(className)[0].style.visibility = visible;
}

function genderTag() {
    var tag = "";
    if (male) tag += "M";
    if (female) tag += "F";
    return tag;
}

function updateGenderForm() {
    var tag = genderTag();
    $(".gender-form").html(
            "<input type=\"hidden\" class=\"gender-tag\" value=\"" +
            tag + "\" name=\"gender\"/>"
    );
}