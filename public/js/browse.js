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
    initializeGenders();

    $(".gender").hide(0).fadeIn(500);

    console.log("Javascript connected!");
    $(".male a").click(function(e) {
        e.preventDefault();
        changeGender("male");
    });
    $(".female a").click(function(e) {
        e.preventDefault();
        changeGender("female");
    });
}

function initializeGenders() {
    console.log("male id: " + $(".male .checkedOverlay").attr("id"));
    if ($(".male .checkedOverlay").attr("id") == "true") {
        console.log("initialize as M");
        changeGender("male");
    }
    console.log("female id: " + $(".female .checkedOverlay").attr("id"));
    if ($(".female .checkedOverlay").attr("id") == "true") {
        console.log("initialize as F");
        changeGender("female");
    }
}

function changeGender(gender) {
    if (gender == "male") {
        male = !male;
        $("." + gender + " .checkedOverlay").attr("id", male);
    } else {
        female = !female;
        $("." + gender + " .checkedOverlay").attr("id", female);
    }
    updateGenderForm();
    //updateSession();
    toggleVisibility(gender + " checkedOverlay");
    if (!male & !female) {
        setVisibility("tag-stuff", "hidden");
    } else {
        setVisibility("tag-stuff", "visible");
    }
    getTags();
}

function getTags() {
    console.log('getting tags');
    $.ajax({
        url: '/tags',
        type: 'get',
        data: {male: male, female: female},
        success: function(d) {
            console.log("success!");
            renderTags(d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
                   console.log("error!");
                   console.log(xhr.status);
                   console.log(thrownError);
               }
    });
}

function renderTags(data) {
    console.log("rendering tags");
    console.log("data: " + data);
    data = JSON.parse(data);
    var html ="";
    html += "<div class=\"title sub-title\">\n";
    html += "   <div class=\"title sub-title\">\n";
    html += "       <div class=\"container browse\">\n";
    html += "           <h4>TAGS</h4>\n";
    html += "       </div>\n" ;
    html += "   </div>\n" ;
    html += "</div>\n" ;
    html += "<div class=\"container tags browse\">\n";
    for (var i=0; i<data.length; i++) {
        var tag = data[i];
        console.log("tag: " + tag);
        console.log("tag name: " + tag.name);
        console.log("tag url: " + tag.imageURL);
        if (i % 3 == 0) {
            html += "<div class=\"row\">\n";
        }
        html += "<div class=\"col-xs-4\">\n";
        html += "    <form id=\"tagForm\" role=\"form\" method=\"get\" action=\"/list\">\n";
        html += "        <input type=\"hidden\" value=" + tag.name + " name=\"tag\"/>\n";
        html += "        <div class=\"gender-form\"></div>\n";
        html += "        <input type=\"image\" src=/" + tag.imageURL + " class=\"img-responsive\"/>\n";
        html += "        <div class=\"tagOverlay\">\n";
        html += "            <h6>" + tag.name + "</h6>\n";
        html += "        </div>\n";
        html += "    </form>\n";
        html += "</div>\n";
        if (i % 3 == 2) {
            html += "</div>"
        }
    }
    html += "</div>"
    $(".tag-stuff").html(html); 
}

function updateSession() {
    var maleUrl;
    if (male) {
        maleUrl = '/addMale';
    } else {
        maleUrl = '/removeMale';
    }
    var femaleUrl;
    if (female) {
        femaleUrl = '/addFemale';
    } else {
        femaleUrl = '/removeFemale';
    }
    $.ajax({
        url: maleUrl,
        type: 'get',
    });
    $.ajax({
        url: femaleUrl,
        type: 'get',
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