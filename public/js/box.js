$(document).ready(function() {
    initializePage();
})


function initializePage() {
	$(".star").click(function(){
        if ($(this).attr("class") == "star") {
          this.src = this.src.replace("greystar.png","yellowstar.png");
        } else {
          this.src = this.src.replace("yellowstar.png","greystar.png");
        }
        $(this).toggleClass("on");
	});

	$(".add").click(function(){
        $(this).find('img').toggle();
	});

	$(".box_title > p").hide();
    $(".info").click(function(){
        	$(".box_title > p").toggle(200);
    });

    $(".dropdown").hide();
    $(".add").click(function(){
       	$(".dropdown").toggle(200);
    });
}