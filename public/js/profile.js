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
	$(".import-form").hide();
	$(".photo-edit").click(function(){
		$(".import-form").slideDown(200);
	})

	var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

	$("#form-close").click(function(){
		$(".import-form").slideUp(200);
		document.getElementById("import-form").reset();
		$("#thisImage").attr("src", "/images/icons/import.png")
	})
    $(".boxes-title").click(function(e) {
        e.preventDefault();
        setToBoxes();
    });
    $(".liked-title").click(function(e) {
        e.preventDefault();
        setToLiked();
    });

    $(".tagline-text-profile").click(function() {
        console.log("clicked!");
        if (this.value == 'Add a tagline here') {
            this.value ='';
        }
    });
    
    $(".tagline-text-profile").blur(function() {
        console.log("blurred!");
        if (this.value == '') {
            this.value ='Add a tagline here';
        } else if (this.value != 'Add a tagline here') {
            setTagline(this.value);
        }
    });
    
    $(".tagline-text-profile").keypress(function() {
        console.log("keypressed!");
        if(event.keyCode==13) {
            event.preventDefault();
        }
    });
}

function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event) {
			var img = new Image();
			img.src = event.target.result;
			img.onload = function() {
            	$("#thisImage").attr("src", img.src);
			}
		}
		reader.readAsDataURL(e.target.files[0]);  
	}

function setTagline(tagline) {
    $.ajax({
        url: '/setTagline',
        type: 'get',
        data: {tagline: tagline}
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