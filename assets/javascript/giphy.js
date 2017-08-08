var topics = ["anxiety", "cold", "confused", "cranky", "disgust", "embarrassing", "excited", "full", "frustrated", "happy", "hopeful", "hot", "hungry", "inspired", "love", "mad", "mischievous", "needy", "over it", "sad", "shy", "stressed", "surprised", "tired"];

// Need a function that loops through the array and makes buttons
function renderButtons() {
	$("#arrayButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("emotion");
		a.addClass("btn-success");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#arrayButtons").append(a);
	}
};
renderButtons();

// When you click on a button this function will add gifs to the page.

$("button").on("click", function() {
	$("#gifs-appear-here").empty();
	var emotion = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
	      console.log(response);

	   var results = response.data;

	   for (var j = 0; j < results.length; j++) {
	   	var newDiv = $("<div>");
        var p = $("<p>");
        p.text("↓ Rating: " + results[j].rating.toUpperCase());
        newDiv.addClass("col-md-4", results[j]);

		var newImage = $("<img>");
		newImage.attr("src", results[j].images.fixed_height_still.url);
		newImage.attr("data-still", results[j].images.fixed_height_still.url);
		newImage.attr("data-animate", results[j].images.fixed_height.url);
		newImage.attr("data-state", "still");
		newImage.addClass("gif", results[j]);
        
        newDiv.append(p);
        newDiv.append(newImage);

        $("#gifs-appear-here").append(newDiv);
	   };

// Need function to animate and still the gifs

	   $(".gif").on("click", function() {
	var state = $(this).attr("data-state");
	
	if (state === "still") {
        var dataAnimateValue = $(this).attr("data-animate");
        $(this).attr("src", dataAnimateValue);
        $(this).attr("data-state", "animate");
      } else {
        var dataStillValue = $(this).attr("data-still");
        $(this).attr("src", dataStillValue);
        $(this).attr("data-state", "still");
      };
      
    });	
});

});

// Need function to to add user input to the array then recall renderButtons function

$("#addEmo").on("click", function(event) {
        event.preventDefault();
        var userInput = $("#userEmo").val().trim();
        topics.push(userInput);
        renderButtons();
      });


