function displayResults(scrapedNews) {
    $("div.wrapper").empty();
    scrapedNews.forEach(function(news) {  
      var $link=$("<a>").attr("href", news.link).addClass("link");
      var $text=$("<div>").text(news.title).addClass("title");
      var $textLink=$link.wrapInner($text);

      var info = $("<section>").append(
        $textLink,
        $("<div>").text(news.text).addClass("text")
      );
        
      $("div.wrapper").append(info);
    });
  };
  
  $("#scrapeBtn").on("click", function() {
    $.getJSON("/scrape", function(data) {
      displayResults(data);
    });
  });
  $("#clearBtn").on("click", function() {
    $("div.wrapper").empty();
  });
  
  $.getJSON("/", function(data) {
    displayResults(data);
  });


// $.getJSON("/scrape", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("div.wrapper").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link +"<br />" + data[i].text + "</p>");
//   }
// });



  