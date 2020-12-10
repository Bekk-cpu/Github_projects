var express       = require("express"),
    app           = express(),
    bodyparser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOveride = require("method-override"),
    User          = require("./models/user"),
    Image         = require("./models/image"),
    Video         = require("./models/video"),
    Audio         = require("./models/audio"),
    seedDB        = require("./seeds");

var audioRoutes   = require("./routes/audios"),
    videoRoutes   = require("./routes/videos"),
    imageRoutes   = require("./routes/images"),
    authRoutes    = require("./routes/auth"),
    commentRoutes = require("./routes/comment");

seedDB();
mongoose.connect("mongodb://localhost/Storage", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOveride("_method"));
app.use(require("express-session")({
    secret: "This is demo website",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(audioRoutes);
app.use(videoRoutes);
app.use(imageRoutes);
app.use(authRoutes);
app.use(commentRoutes);
app.listen("8000", function(){});

module.exports = seedDB;