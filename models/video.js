var mongoose = require("mongoose");
var videoschema = new mongoose.Schema({
    name: String,
    video: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = mongoose.model("Video", videoschema);