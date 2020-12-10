var express = require("express");
var router = express.Router();
var Video = require("../models/video");

router.get("/home/videos", function(req, res){
    Video.find({}, function(err, all_videos){
        if(err) {
            console.log(err);
        } else {
            res.render("videos", {videos: all_videos});
        }
    });
});

router.get("/home/videos/new", isLogedIn, function(req, res){
    res.render("newVideo");
});
router.post('/home/videos', function(req, res){
    var name = req.body.name
    var video = req.body.video
    var desc = req.body.description
    var newVideo = {name: name, video: video, description: desc}
    Video.create(newVideo, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/videos");
        }
    })
});

router.get("/home/videos/:id", function(req, res){
    Video.findById(req.params.id).populate("comments").exec(function(err, foundVideo){
        if(err){
            console.log(err);
        } else {
            res.render("showVideos", {video: foundVideo});
        }
    });
});

function isLogedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}
module.exports = router;