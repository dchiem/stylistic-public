$(document).ready(function() {
    initializePage();
});

function initializePage() {
    console.log("Javascript connected!");
    $(".star").click(function(){
        var boxName = $(".box_title h2").text();
        var userName = $(".star").attr("id");
        var likeData = { 'box': boxName, 'userName': userName };
        if ($(this).attr("class") == "star") {
            this.src = this.src.replace("greystar.png","yellowstar.png");
            $.ajax({
                url: '/like',
                type: 'get',
                data: likeData
            });
        } else {
            this.src = this.src.replace("yellowstar.png","greystar.png");
            $.ajax({
                url: '/dislike',
                type: 'get',
                data: likeData
            });
        }
        $(this).toggleClass("on");
    });

    $(".add").click(function(){
        $(this).find('img').toggle();
    });

    $(".box_title > p").hide();
    $(".info-icon").click(function(){
        $(".box_title > p").toggle(200);
    });

    $(".dropdown").hide();
    $(".add").click(function(){
        $(".dropdown").toggle(200);
    });
}

/*
   function test(err, users) {
   console.log("User = " +  users[0]);
   }
   */
