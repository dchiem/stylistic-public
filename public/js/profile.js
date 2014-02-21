'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Javascript connected!");
    $(".boxes-title").click(function(e) {
        e.preventDefault();
        setToBoxes();
    });
    $(".liked-title").click(function(e) {
        e.preventDefault();
        setToLiked();
    });
}

function setToLiked() {
    $(".liked-title .container").attr("class","container main-half-title");
    $(".liked-boxes").attr("style","");
    $(".boxes-title .container").attr("class","container sub-half-title");
    $(".your-boxes").attr("style","display:none");
}

function setToBoxes() {
    $(".liked-title .container").attr("class","container sub-half-title");
    $(".liked-boxes").attr("style","display:none");
    $(".boxes-title .container").attr("class","container main-half-title");
    $(".your-boxes").attr("style","");
}