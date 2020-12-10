var express = require("express");
var router = express.Router();
var Comment   = require("../models/comment"),
    Image     = require("../models/image"),
    Video     = require("../models/video"),
    Audio     = require("../models/audio");

router.get("/home/images/:id/comments/new", function(req, res){
    Image.findById(req.params.id, function(err, image){
        if(err){
            console.log(err);
        } else {
            res.render("newComment", {image: image});
        }
    })
});

router.post("/home/images/:id/comments", function(req, res){
    Image.findById(req.params.id, function(err, image){
        if(err){
            console.log(err);
            res.redirect("/home/images/:id");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    image.comments.push(comment);
                    image.save();
                    res.redirect('/home/images/' + image._id);
                }
            })
        }
    })
});

router.get("/home/videos/:id/comments/new", function(req, res){
    Video.findById(req.params.id, function(err, video){
        if(err){
            console.log(err);
        } else {
            res.render("newCommentV", {video: video});
        }
    })
});

router.post("/home/videos/:id/comments", function(req, res){
    Video.findById(req.params.id, function(err, video){
        if(err){
            console.log(err);
            res.redirect("/home/videos/:id");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    video.comments.push(comment);
                    video.save();
                    res.redirect('/home/videos/' + video._id);
                }
            })
        }
    })
});

router.get("/home/audios/:id/comments/new", function(req, res){
    Audio.findById(req.params.id, function(err, audio){
        if(err){
            console.log(err);
        } else {
            res.render("newCommentO", {audio: audio});
        }
    })
});

router.post("/home/audios/:id/comments", function(req, res){
    Audio.findById(req.params.id, function(err, audio){
        if(err){
            console.log(err);
            res.redirect("/home/audios/:id");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    audio.comments.push(comment);
                    audio.save();
                    res.redirect('/home/audios/' + audio._id);
                }
            })
        }
    })
});

module.exports = router;