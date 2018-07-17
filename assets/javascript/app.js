// Initial array of instruments
var instruments = ["violin", "trumpet", "clarinet"];

// displayInstrumentInfo function re-renders the HTML to display the appropriate content
function displayInstrumentInfo() {
    // Grabbing and storing the data-instrument property value from the button
    var buttonInstrument = $(this).attr("data-name");

    // Constructing a queryURL using the instrument name, limit the images returned to 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    buttonInstrument + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL for the clicked button
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

            // Creating a div to hold the image
            var instrumentDiv = $("<div class='instrument'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            instrumentDiv.append(pOne);
      
            // Retrieving the URL for the image
            var imageURL = results[i].images.original_still.url;

            // Creating an <img> element to hold the image
            var image = $("<img>").attr("src", imageURL);

            // Setting the data-still attribute of the image
            image.attr("data-still", results[i].images.original_still.url);
            // Setting the data-animate attribute of the image
            image.attr("data-animate", results[i].images.fixed_height.url);
            // Setting the data-state attribute of the image to still
            image.attr("data-state","still");
            // Adding class gif for the click to animate / still piece
            image.addClass("gif");
              
            // Appending image tag to the instrumentDiv
            instrumentDiv.append(image);
            
            // Prependng the instrumentDiv to the HTML page in the gifs-appear-here" div
            $("#gifs-appear-here").prepend(instrumentDiv);
          }
          
        });
}

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
    a.addClass("instrument-btn");
    // Adding a data-attribute
    a.attr("data-name", instruments[i]);
    // Providing the initial button text
    a.text(instruments[i]);
    console.log("a: " + a);
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
  console.log("new button instrument " + instrument);

  // Adding the movie from the textbox to our array
  instruments.push(instrument);
  console.log(instruments);

  // Clear the text input field upon clicking Submit
  $("input:text").val("");

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the instrument info
// Using $(document).on instead of $(".instrument-btn").on to add event listeners to dynamically generated elements
$(document).on("click", ".instrument-btn", displayInstrumentInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();