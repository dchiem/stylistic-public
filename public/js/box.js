$(document).ready(function() {
    initializePage();
});

function initializePage() {
    console.log("Javascript connected!");
    $(".star").click(function(){
        var id = $(".star").attr("id");
        var likeData = { 'id': id};
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

    $(".box_title > p").hide();
    $(".info-icon").click(function(){
        $(".box_title > p").toggle(200);
    });

    $(".add").click(function(){
        $(this).find('img').toggle();
    });

    $(".dropdown").hide();
    $(".add").click(function(){
        $(".dropdown").toggle(200);

        /*$(document).mouseup(function (e)
        {
            var container = $(".add");

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $(".dropdown").hide(200);
            }
        });*/

    });

}

/*
   function test(err, users) {
   console.log("User = " +  users[0]);
   }
   */
