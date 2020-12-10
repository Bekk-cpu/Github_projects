var mongoose = require("mongoose");
var audioschema = new mongoose.Schema({
    name: String,
    audio: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = mongoose.model("Audio", audioschema);