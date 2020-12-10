var mongoose     = require("mongoose"),
    Image        = require("./models/image"),
    Video        = require("./models/video"),
    Audio        = require("./models/audio"),
    Comment      = require("./models/comment");


var image_data = [
    {
        name: "woods",
        image: "https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&h=350",
        description: "reminder of home"
    }
]
var video_data = [
    {
        name: "Boxing drills",
        video: "https://www.youtube.com/watch?v=zccHPeXyJVk&t=281s",
        description: "i wish i am that good at boxing"
    },
]

var audio_data = [
    {
        name: "La Casa De Papel",
        audio: "https://gaana.com/song/bella-ciao-hugel-remix",
        description: "Soundtrack of money heist"
    }
]

function seedDB(){
    Image.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("removed Images!!");
            image_data.forEach(function(seed){
                Image.create(seed, function(err, image){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added images");
                        Comment.create(
                            {
                                text: "This place is great",
                                author: "Bereket"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    image.comments.push(comment);
                                    image.save();
                                    console.log("Created a new comment");
                                }
                            })
                    }
                })
            })
        }
    });
    Video.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed all videos");
            video_data.forEach(function(seed){
                Video.create(seed, function(err, video){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added videos");
                        Comment.create(
                            {
                                text: "This looks great",
                                author: "Bereket"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    video.comments.push(comment);
                                    video.save();
                                    console.log("Created a new comment");
                                }
                            })
                    }
                })
            })
        }
    });
    Audio.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed all audios");
            audio_data.forEach(function(seed){
                Audio.create(seed, function(err, audio){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added audios");
                        Comment.create(
                            {
                                text: "sounds great",
                                author: "Bereket"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    audio.comments.push(comment);
                                    audio.save();
                                    console.log("Created a new comment");
                                }
                            })
                    }
                })
            })
        }
    })
}
module.exports = seedDB;