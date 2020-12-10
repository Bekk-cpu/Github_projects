var express = require("express");
var router = express.Router();
var Image = require("../models/image");
router.get("/home/images", function(req, res){
    Image.find({}, function(err, all_images){
        if(err) {
            console.log(err);
        } else {
            res.render("images", {images: all_images});
        }
    })
});

router.post("/home/images", function(req, res){
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newimage = {name: name, image: image, description: desc}
    Image.create(newimage, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/home");
        }
    });
});

router.get("/home/images/new", isLogedIn, function(req, res){
    res.render("newImage");
});

router.get("/home/images/:id", function(req, res){
    Image.findById(req.params.id).populate("comments").exec(function(err, Image){
        if(err){
            console.log(err);
        } else {
            res.render("showImages", {image: Image});
        }
    });
});

router.get("/:id/edit", function(req, res){
    res.render("imagesedit");
})

function isLogedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;