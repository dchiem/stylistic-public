exports.getRefreshCookie = function(req, res){
    console.log("refresh = " + req.cookies.refresh);
    res.send(req.cookies.refresh);
};

exports.createRefreshCookie = function(req, res){
    res.cookie('refresh', 'true');
    res.send(req.cookies.refresh);
};

exports.deleteRefreshCookie = function(req, res){
    res.cookie('refresh', 'false');
    res.send(req.cookies.refresh);
};
