// Packages
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Handlebars
var exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static css
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the DB
mongoose.connect("mongodb://localhost/elitedatabase", { useNewUrlParser: true });

// Home page
app.get('/', function (req, res) {
    res.render('home');
});

// Get route for scraping the elite daily website
app.get("/scrape", function (req, res) {
    axios.get("https://www.elitedaily.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".el").each(function (i, element) {
            
            // Empty Object to save the data scraped
            var result = {};

            // Image
            $(this).find(".eH .ju").each(function(i, element) {
                result.image = $(this).text();
            });
            
            // Title of article
            $(this).find(".eH .en .ez").each(function(i, element){
                result.title = $(this).text();
            });

            // Author 
            $(this).find(".eH .en .eA").each(function(i, element){
                result.subtitle = $(this).text();
            });
            
            // Link to article
            result.link = $(this).attr("href");
            
        
            console.log(result);

            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err)
            });
        });
        
        res.send("Scrape Complete!");
    });
});

app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});