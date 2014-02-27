var thisBoxId;

$(document).ready(function() {
    initializePage();
});

function initializePage() {
    console.log("Javascript connected!");
    thisBoxId = $(".star").attr("id");
    $(".star").click(function(){
        var likeData = { 'id': thisBoxId};
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

    $(".dropdown").hide();
    $("body").click(function(event) {
        $(".add").find(".dropdown").fadeOut(200);
    });

    $(".mybox").click(function(event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).toggleClass("green");
        $(this).parent().parent().parent().parent().find('img').toggle();
        var boxId = $(this).attr("id");
        var itemId = $(this).parent().parent().parent().attr("id")
        console.log("boxid : " + boxId + " itemId : " + itemId);
        if ($(this).hasClass("green")) {
            addToBox(boxId, itemId);
        } else {
            removeFromBox(boxId, itemId);
        }
    });

    $(".add img").click(function(event) {
        event.stopPropagation();
        $(this).parent().find(".dropdown").toggle(200);
    });
}

function addToBox(boxId, itemId) {
    $.ajax({
        url: '/addToBox',
        type: 'get',
        data: { boxId : thisBoxId, newBoxId : boxId, itemId : itemId}
    });
}

function removeFromBox(boxId, itemId) {
    $.ajax({
        url: '/removeFromBox',
        type: 'get',
        data: { boxId : thisBoxId, newBoxId : boxId, itemId : itemId}
    });
}
