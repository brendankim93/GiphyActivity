var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3900;

app.use("/assets", express.static(__dirname + '/assets'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});