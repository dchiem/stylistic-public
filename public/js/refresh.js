window.onload = function() {
    console.log("on load");
    refreshCookie();
}

function goBackAndRefresh() {
    console.log("creating cookie");
    createRefreshCookie();
}

function refreshCookie() {
    $.get('/getRefreshCookie', function(data) {
        console.log("data:" + data);
        if (data == "true") {
            console.log("returning true");
            console.log("deleting cookie");
            deleteAndRefresh();
        } 
    });
}

function createRefreshCookie() {
    $.get('/createRefreshCookie', function(data) {
        window.history.back();
    });
}

function deleteAndRefresh() {
    $.get('/deleteRefreshCookie', function(data) {
        console.log("reloading page");
        window.location = window.location;
    });
}


