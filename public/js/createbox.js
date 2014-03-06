$(document).ready(function() {
    initializePage();
});

var data = {};
data.items = [];
data.deleted = [];
data.genders = [];

function initializePage() {
    data.image = $(".box-image img").attr("src");
    console.log("image " + data.image);
    
	$(".import-form").hide();
	$("#import-item").click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		$("#import-form").slideDown(200);
	});

	$(".photo-edit").click(function(){
		$("#box-import-form").slideDown(200);
	});

    $(".fancybox").click(function(e){
        e.preventDefault();
    });

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

    $(".delete-item").on("click", function(){
        console.log("click!");
        var id = this.id;
        if (id) {
            // deleting an item in the DB
            var itemSrc = $(this).parent().parent().children(".fancybox").attr("href");
            var itemName = $(this).parent().parent().children(".fancybox").attr("title");
            $(this).parent().parent().remove();
            console.log("src: " + itemSrc + " - name : " +itemName);
            data.deleted.push(itemName);
        } else {
            var itemSrc = $(this).parent().fancybox.attr("href");
            var itemName = $(this).parent().fancybox.attr("title");
            removeItem(itemSrc, itemName);
            this.parent().remove();
        }
        console.log(data.deleted.length + " deleted items");
        console.log(data.items.length + " added items");
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
        updateData();
        console.log("data.title = " + data.title);
        console.log("data.genders = " + data.genders);
        console.log("data.tags[0] = " + data.tags[0]);
        console.log("data.tags = " + data.tags);
        console.log("data.image = " + data.image);
        console.log("data.items = " + data.items);
        $.post('/addBox', data, function() {
            $(".add-box").submit();
        });
    });

    $(".save-box button").click(function(e) {
        e.preventDefault();
        updateData();  
        $.post('/updateBox', data, function() {
            $(".save-box").submit();
        });
    });

    $(".delete-box button").click(function(e) {
        e.preventDefault();
        updateData();  
        $.post('/deleteBox', data, function() {
            $(".delete-box").submit();
        });
    });
}

function updateData() {
    parseTags();
    data.title = $("#title").val();
    data.id = $("#boxid").attr("value");
    data.genders = [];
    if ($("#M-check").prop("checked")) data.genders.push("M");
    if ($("#F-check").prop("checked")) data.genders.push("F");
}

function removeItem(itemSrc, itemName) {
    for (var i=0; i < data.items.length; i++) {
        var item = data.items[i];
        if (item.itemSrc == itemSrc && item.itemName == itemName) {
            data.items.splice(i, 1);
            return;
        }
    }
}

function parseTags() {
    tagsString = $("#tags").val();
    data.tags = tagsString.split(',');
}

function addToItems(itemSrc, itemName){
    var html = "<div class=\"col-xs-6\">\n" +
        "<a class=\"fancybox\" href=" + itemSrc + " data-lightbox=\"clothes\" title=" + itemName + "><img src=" + itemSrc + " class=\"img-responsive\"></a>\n" + 
                "<div class=\"col-xs-9 item-title\">" + 
                    "<div class=\"add\" data-lightbox=\"add\">" +
                    "<textarea type=\"text\" placeholder=\"Name this item\" onfocus=\"this.placeholder = ''\" " +
                            "class=\"item-title\" name=\"item-title\" id=\"item-title\" rows=\"2\">" + itemName + "</textarea>" +
                    "</div>" + 
                "</div>" +
                "<div class=\"col-xs-3 delete-symbol\">" +
                    "<button class=\"delete-item\">" +
                        "<i class=\"glyphicon glyphicon-remove-sign\"></i>" +
                    "</button>" +
                "</div>"
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
