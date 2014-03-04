$(document).ready(function() {
    initializePage();
});

var data = {};
data.items = [];
data.genders = [];

function initializePage() {
    data.image = $(".box-image img").attr("src");
    console.log("image " + data.image);
    
	$(".import-form").hide();
	$("#import-item").click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		$("#import-form").slideDown(200);
	})

	$(".photo-edit").click(function(){
		$("#box-import-form").slideDown(200);
	})

	var imageLoader = document.getElementById('imageLoader');
	var boxImageLoader = document.getElementById('boxImageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    boxImageLoader.addEventListener('change', handleBoxImage, false);

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

    function handleBoxImage(e){
		var reader = new FileReader();
		reader.onload = function(event) {
			var img = new Image();
			img.src = event.target.result;
			img.onload = function() {
            	$("#boxThisImage").attr("src", img.src);
			}
		}
		reader.readAsDataURL(e.target.files[0]);  
	}

    $("#newBoxBtn").click(function(e){
        e.preventDefault();
        data.image = $("#boxThisImage").attr("src");
        console.log("image after click = " + data.image);
        setBoxImage(data.image);        
        $(".import-form").slideUp(200);
    });

    $("#newItemBtn").click(function(e){
        e.preventDefault();
        itemSrc = $("#thisImage").attr("src");
        itemName = $("#name").val();
        item = {"imageURL": itemSrc, "name": itemName};
        data.items.push(item);
        addToItems(itemSrc, itemName);
        $(".import-form").slideUp(200);
    });

	$("#form-close").click(function(){
		$(".import-form").slideUp(200);
		document.getElementById("import-form").reset();
		$("#thisImage").attr("src", "/images/icons/import.png")
	});
    
    $("#box-form-close").click(function(){
		$(".import-form").slideUp(200);
		document.getElementById("import-form").reset();
		$("#thisBoxImage").attr("src", "/images/icons/import.png")
	});

	$(function(){
		$(".add-box :submit").click(function(e){
			$("textarea").each(function() {
				if($(this).val() === ""){
					alert("Please enter a title and related tags.");
					e.preventDefault();
				}
			});
		});
	});

    $(".add-box button").click(function(e) {
        e.preventDefault();
        parseTags();
        data.title = $("#title").val();
        if ($("#M-check").prop("checked")) data.genders.push("M");
        if ($("#F-check").prop("checked")) data.genders.push("F");
        console.log("data.title = " + data.title);
        console.log("data.genders = " + data.genders);
        console.log("data.tags[0] = " + data.tags[0]);
        console.log("data.tags = " + data.tags);
        console.log("data.image = " + data.image);
        console.log("data.items = " + data.items);
        $.post('/addBox', data);
        $(".add-box").submit();
    });
}

function parseTags() {
    tagsString = $("#tags").val();
    data.tags = tagsString.split(',');
}

function addToItems(itemSrc, itemName){
    var html = "<div class=\"col-xs-6\">\n" +
        "<a href=" + itemSrc + " data-lightbox=\"clothes\" title=" + itemName + "><img src=" + itemSrc + " class=\"img-responsive\"></a>\n" + 
    "</div>";
    $("#clothes").append(html);
}

function closeBoxForm() {
    $(".import-form").slideUp(200);
	document.getElementById("import-form").reset();
    $("#thisBoxImage").attr("src", "/images/icons/import.png")
}

function setBoxImage(imageSrc) {
    $(".box-image img").attr("src", imageSrc);
}
