var express = require("express");
var expresshbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");

var db = require("./models");

var PORT = process.env.PORT || 3000; 

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.Promise = Promise;
if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/Mongonews");
}


// // Routes
var routes = require("./controller/htmlRouts");
app.use(routes);
// // A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with request
//     axios.get("http://www.echojs.com/").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every h2 within an article tag, and do the following:
//       $("article h2").each(function(i, element) {
//         // Save an empty result object
//         var result = {};
  
//         // Add the text and href of every link, and save them as properties of the result object
//         result.title = $(this)
//           .children("a")
//           .text();
//         result.link = $(this)
//           .children("a")
//           .attr("href");
  
//         // Create a new Article using the `result` object built from scraping
//         db.Article.create(result)
//           .then(function(dbArticle) {
//             // View the added result in the console
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             // If an error occurred, send it to the client
//             return res.json(err);
//           });
//       });
  
//       // If we were able to successfully scrape and save an Article, send a message to the client
//       res.send("Scrape Complete");
//     });
//   });
  
//   // Route for getting all Articles from the db
//   app.get("/articles", function(req, res) {
//     // TODO: Finish the route so it grabs all of the articles
//     db.Article.find({})
//     .then(function(dbArticle){
//       res.json(err);
//     })
//     .catch(function(err){
//       res.json(err)
//     })
//   });
  
//   // Route for grabbing a specific Article by id, populate it with it's note
//   app.get("/articles/:id", function(req, res) {
//     // TODO
//     // ====
//     // Finish the route so it finds one article using the req.params.id,
//     // and run the populate method with "note",
//     // then responds with the article with the note included
//     db.Article.findOne({
      
//       _id : req.params.id,
//     })
//     .populate("notes")
//     .then(function(dbArticle){
//       res.json(dbArticle)
//     })
//     .catch(function(err){
//       res.json(err)
//     })
//   });
  
//   // Route for saving/updating an Article's associated Note
//   app.post("/articles/:id", function(req, res) {
//     // TODO
//     // ====
//     // save the new note that gets posted to the Notes collection
//     db.Note.create( req.body)
//     // then find an article from the req.params.id
//     // and update it's "note" property with the _id of the new note
    
//     .then(function(dbNote){
//       return db.Article.findOneAndUpdate({_id: req.params.id},{$set:{"notes": dbNote._id}}, {new: true})
//       res.json(dbArticle)
//     })
//     .catch(function(err){
//       res.json(err)
//     })
  
//   });
  
  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  
