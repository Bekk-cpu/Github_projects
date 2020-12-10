var express = require("express");
var router = express.Router();
var Audio = require("../models/audio");

router.get("/home/audios", function(req, res){
    Audio.find({}, function(err, all_audios){
        if (err) {
            console.log(err);
        } else {
            res.render("audios", {audios: all_audios});
        }
    });
});



router.get("/home/audios/new", isLogedIn, function(req, res){
    res.render("newAudio");
});

router.post('/home/audios', function(req, res){
    var name = req.body.name
    var audio = req.body.audio
    var desc = req.body.description
    var newAudio = {name: name, audio: audio, description: desc}
    Audio.create(newAudio, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/audios");
        }
    })
});

router.get("/home/audios/:id", function(req, res){
    Audio.findById(req.params.id).populate("comments").exec(function(err, foundAudio){
        if(err){
            console.log(err);
        } else {
            res.render("showaudios", {audio: foundAudio})
        }
    })
    res.render("showaudios");
});

function isLogedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;