var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();
var db = require("../models");

router.get("/", function(req,res){
    res.sendfile("../public/index.html");
});

router.get("/savedArti", function(req,res){
    res.sendfile("../public/saved.html");
});

router.get("/showAll", function(req,res){
    db.Article.find({}).then(function(data){
        res.json(data);
    })
});

router.get("/showSaved", function(req,res){
    db.Article.find({isSaved: true}).then(function(data){
        res.json(data);
    })
});

router.get("/save/:id", function(req,res){
    db.Article.findOneAndUpdate({_id:req.params.id}, { $set: { "isSaved": true }}, {new:true}).then(function(data){
        res.json(data);
    })
});

router.get("/scrape", function(req,res){
     var url = "https://www.nytimes.com/";
    request(url, function(err, response, html ){
        console.log('response received from nyt');
        var $ = cheerio.load(html);
        var titles = [];
        var newArticleCount = $("h2.store-heading").length; // total to add
        var articleCounter = 0; // track articles created
        $("h2.story-heading").each(function(i,item){
           console.log('articleCounter:', articleCounter)
            var entry = ({
                Headline: $(item).children().text().trim(),
                URL:  $(item).children().attr("href"),
                Summary: $(item).parent().children(".summary").text().trim()
            });

            titles.push(entry);
            db.Article.create(entry).then(function(dataEntered) {
                articleCounter++; // update count of articles created
                if (articleCounter === newArticleCount /* && !res.headersSent */) { // check if done creating articles
                    res.send('scrape complete'); // only send response once
                }
            })
            .catch(function(err) {
                console.log(err.message);
                articleCounter++;
                if (articleCounter === newArticleCount /* && !res.headersSent */) {
                    res.send('scrape complete');
                }
            });
        });
    })
});


module.exports = router;
