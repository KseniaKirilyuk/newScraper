var express = require("express");
//var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./newsModel");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//mongoose.connect("mongodb://localhost/newScraper", { useNewUrlParser: true });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// var databaseUrl = "newScraper";
// var collections = ["scrapedNews"];


app.get("/scrape", function(req, res) {
  axios.get("https://www.miamiherald.com/latest-news/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
      var result={};
        result.title = $(this).find("h4").text();
        result.link = $(this).find("h4").children("a").attr("href");
        result.text=$(this).find("div.teaser").text();

        db.create(result)
            .then(function(dbNews) {
            console.log(dbNews);
            })
            .catch(function(err) {
            console.log(err);
            });
    });
    db.find({})
    .then(function(dbNews) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbNews);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  
});
// db.scrapedNews.find({}, function(error, found) {
//         // Log any errors if the server encounters one
//         if (error) {
//           console.log(error);
//         }
//         // Otherwise, send the result of this query to the browser
//         else {
//           res.json(found);
//         }
//       });
    
    
});

//   db.scrapedNews.find({}, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// app.get("/", function(req, res) {
//     // Grab every document in the Articles collection
//     db.scrapedNews.find({})
//       .then(function(newScraper) {
//         // If we were able to successfully find Articles, send them back to the client
//         res.json(newScraper);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });
  


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
