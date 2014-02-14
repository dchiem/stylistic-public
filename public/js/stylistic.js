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
        console.log(genderTag());
    });
    $(".female a").click(function(e) {
        console.log("female tag clicked");
        e.preventDefault();
        female = !female;
        updateGenderForm();
        toggleVisibility("female checkedOverlay");
        console.log(genderTag());
    });
}

function toggleVisibility(className) {
    var visible = document.getElementsByClassName(className)[0].style.visibility;
    if (visible == "visible") visible = "hidden";
    else visible = "visible";
    document.getElementsByClassName(className)[0].style.visibility = visible;
}

function toggleFemaleCheck() {

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


function anagrammedName(name) {
    // Thanks, Internet Anagram Server!

    if (name == "Doug Engelbart") {
        return "Notable Grudge";
    } 
    else if (name == "Ivan Sutherland") {
        return "Vandal Heist Run";
    }
    else if (name == "JCR Licklider") {
        return "Crick Rid Jell";
    }
    else if (name == "Vannevar Bush") {
        return "Ravens Van Hub";
    }
    else if (name == "Alan C. Kay") {
        return "Canal Yak";
    }
    else if (name == "Allen Newell") {
        return "Ellen All New";
    }
    else if (name == "Lucy Suchman") {
        return "Lunacy Chums";
    }
    else if (name == "Grace Hopper") {
        return "Gear Chopper";
    }
    else {
        console.log(name + " not known for anagramming.");
        return name;
    }
}