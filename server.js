const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

var port = process.env.PORT || 3000;
var hostname = "localhost";

var app = express();

app.use(cors());

app.use(bodyparser.json());
//Les information sur la manière dont est coder le fichier se trouve dans le header et cette ligne permet de savoir si il est bien encoder ou pas c'est ça, parce qu'elle vérifie le herder.
//header*

app.use(bodyparser.urlencoded({ extended: false }));

// importations des route
app.use("/article", require("./router/article"));
app.use("/contact", require("./router/contact"));




app.listen(port, hostname, function() {
    console.log("mon serveur fonction sur http://" + hostname + ":" + port + "\n");
});