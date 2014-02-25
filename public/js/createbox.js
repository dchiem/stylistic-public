$(document).ready(function() {
    initializePage();
});

function initializePage() {

	$(".import-form").hide();
	$("#import-item").click(function(){
		$(".import-form").slideDown(200);
	})

	var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

	/*var canvas = document.getElementById('imageCanvas');
	var ctx = canvas.getContext('2d');

	function handleImage(e){
	    var reader = new FileReader();
	    reader.onload = function(event){
	        var img = new Image();
	        img.onload = function(){
	            canvas.width = img.width;
	            canvas.height = img.height;
	            ctx.drawImage(img,0,0, 30, 30);

	            if (canvas.height > 0) {
					$("#thisImage").hide();
				}

	        }
	        img.src = event.target.result;
	    }
	    reader.readAsDataURL(e.target.files[0]);     
	}*/

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

	$("#form-close").click(function(){
		$(".import-form").slideUp(200);
		document.getElementById("import-form").reset();
		$("#thisImage").attr("src", "/images/icons/import.png")
	})

	$(function(){
		$(":submit").click(function(e){
			$("textarea").each(function() {
				if($(this).val() === ""){
					alert("Please enter a title and related tags.");
					e.preventDefault();
				}
			});
		});
	});

}