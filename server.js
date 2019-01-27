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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/elitedatabase";

mongoose.connect(MONGODB_URI)

// // Connect to the DB
// mongoose.connect("mongodb://localhost/elitedatabase", { useNewUrlParser: true });

// Home page
app.get('/', function (req, res) {
    res.render('home');
});

app.get("/saved", function(req, res) {
    res.render("savedarticles");
});

// Get route for scraping the elite daily website
app.get("/scrape", function (req, res) {
    axios.get("https://www.elitedaily.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".el").each(function (i, element) {

            // Empty Object to save the data scraped
            var result = {};

            // Image
            $(this).find(".eH .ju").each(function (i, element) {
                result.image = $(this).text();
            });

            // Title of article
            $(this).find(".eH .en .ez").each(function (i, element) {
                result.title = $(this).text();
            });

            // Author 
            $(this).find(".eH .en .eA").each(function (i, element) {
                result.subtitle = $(this).text();
            });

            // Link to article
            result.link = $(this).attr("href");


            console.log(result);

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err)
                });
        });
        res.send("Scrape Complete!");
    });
});

// display all articles
app.get("/showall", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/showall/:id", function(req, res) {

    var id = req.params.id;

    db.Article.findOne({_id: id})

    .then(function(dbArticle) {

        var result = {
            image: dbArticle.image,
            title: dbArticle.title,
            subtitle: dbArticle.subtitle,
            link: dbArticle.link
        };

        console.log(dbArticle);

        db.savedArticle.create(result);
        res.json(dbArticle);
    }) 
    .catch(function(err) {
        res.json(err)
    });
});

// displays all saved articles
app.get("/showsaved", function(req, res) {
    
    db.savedArticle.find({})
    .then(function(dbSaved){
        res.json(dbSaved);
    })
    .catch(function(err){
        res.json(err);
    });
});

// Path to delete all documents from collection
app.delete("/deleteall", function(req, res){

    db.savedArticle.remove({}, function(err){

    });
});

// Path to delete a document from collection
app.delete("/deleteart/:id", function(req, res){
    
    var artID = req.params.id;
    db.savedArticle.findByIdAndDelete(artID, function(){
        res.render("savedarticles")
    });
});

app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});