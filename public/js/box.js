$(document).ready(function() {
    initializePage();
})


function initializePage() {
	$(".like").click(function(){
        $(this).find('img').toggle();
	});

	$(".add").click(function(){
        $(this).find('img').toggle();
	});

	$(".box_title > p").hide();
    $("h2 > img").click(function(){
        	$(".box_title > p").toggle(200);
    });

    $(".dropdown").hide();
    $(".add").click(function(){
       	$(".dropdown").toggle(200);
    });
}