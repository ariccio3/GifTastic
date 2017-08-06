var topics = ["anxiety", "cold", "confused", "cranky", "disgust", "embarrassing", "excited", "full", "frustrated", "happy", "hopeful", "hot", "hungry", "inspired", "love", "mad", "mischievous", "needy", "over it", "sad", "shy", "stressed", "surprised", "tired"];

// Need a function that loops through the array and makes buttons
function renderButtons() {
	$("#arrayButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("emotion");
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
        p.text("Rating: " + results[j].rating);
		var newImage = $("<img>");
		newImage.addClass("data-animate", results[j]);
		newImage.text(results[j].images.fixed_height.url);

        newImage.attr("src", results[j].images.original_still.url);
        newDiv.append(p);
        newDiv.append(newImage);

        $("#gifs-appear-here").append(newDiv);
	   };
});

});
// Need function to animate and still the gifs
	

// Need function to to add user input to the array then recall renderButtons function

$("#addEmo").on("click", function(event) {
        event.preventDefault();
        var userInput = $("#userEmo").val().trim();
        topics.push(userInput);
        renderButtons();
      });

// $(document).on("click", ".emotion", displayMovieInfo);
