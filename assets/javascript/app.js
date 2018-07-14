// Initial array of instruments
var instruments = ["violin", "trumpet", "clarinet"];

// Render images for existing buttons when button clicked
// Adding click event listen listener to all buttons
$("button").on("click", function() {
  
  // Grabbing and storing the data-instrument property value from the button
  var buttonInstrument = $(this).attr("data-instrument");

  // Constructing a queryURL using the instrument name, limit the images returned to 10
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  buttonInstrument + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      // Deleting the buttons prior to adding new instruments
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
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
        instrumentImage.addClass("gif");
        // Setting the src attribute of the image to a property pulled off the result item
        instrumentImage.attr("src", results[i].images.original_still.url);
        // Setting the data-still attribute of the image
        instrumentImage.attr("data-still", results[i].images.original_still.url);
        // Setting the data-animate attribute of the image
        instrumentImage.attr("data-animate", results[i].images.fixed_height.url);
        // Setting the data-state attribute of the image to still
        instrumentImage.attr("data-state","still");
        // Appending the paragraph and image tag to the instrumentDiv
        instrumentDiv.append(instrumentImage);
        instrumentDiv.append(p);

        // Prependng the instrumentDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(instrumentDiv);
      }
    });
});

// Toggle animation by clicking on image (If still, animate. If animated, make still.)
$(document).on("click", ".gif",function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// Function for displaying instrument new buttons
function renderButtons() {

  // Deleting the buttons prior to adding new instrument buttons
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  console.log("renderButtons instruments array " + instruments);

  // Looping through the array of instruments
  for (var i = 0; i < instruments.length; i++) {

    // Then dynamically generating buttons for each instrument in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of instrument to our button
    a.addClass("data-instrument");
    // Adding a data-attribute
    a.attr("data-name", instruments[i]);
    // Providing the initial button text
    a.text(instruments[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a newly added button is clicked
$("#add-instrument").on("click", function(event) {
  // Prevent default behavior of whole page being reloaded
  event.preventDefault();

  // This line grabs the input from the textbox
  var instrument = $("#instrument-input").val().trim();
  console.log(instrument);

  // Adding the movie from the textbox to our array
  instruments.push(instrument);
  console.log(instruments);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the instrument info
// Using $(document).on instead of $(".instrument").on to add event listeners to dynamically generated elements
$(document).on("click", ".instrument", false);

// Calling the renderButtons function to display the initial buttons
// renderButtons();