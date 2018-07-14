// Adding click event listen listener to all buttons
$("button").on("click", function() {
  // Grabbing and storing the data-instrument property value from the button
  var instruments = $(this).attr("data-instrument");

  // Constructing a queryURL using the instrument name, limit the images returned to 10
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  instruments + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var instrumentDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var instrumentImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        instrumentImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the instrumentDiv
        instrumentDiv.append(p);
        instrumentDiv.append(instrumentImage);

        // Prependng the instrumentDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(instrumentDiv);
      }
    });
});