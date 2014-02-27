$(document).ready(function() {
    initializePage();
});

function initializePage() {

	$(".import-form").hide();
	$("#import-item").click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		$(".import-form").slideDown(200);
	})

	$(".photo-edit").click(function(){
		$("#box-import-form").slideDown(200);
	})

	var imageLoader = document.getElementById('imageLoader');
	var boxImageLoader = document.getElementById('boxImageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    boxImageLoader.addEventListener('change', handleImage, false);

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
    
    $("#box-form-close").click(function(){
		$(".import-form").slideUp(200);
		document.getElementById("import-form").reset();
		$("#thisImage").attr("src", "/images/icons/import.png")
	})
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
}
