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
}