var topics = ["Cool Story Bro", "Bruh", "How you doing?", "Beer me", "What's Up", "Are you crazy?", "Lame", "Loser", "Hallelujah", "You suck", "What in the World?", "Barnacles!", "Really?", "Are you kidding me?", "Is this real life?", "Oh no!", "Literally", "No way!", "It ain't Ralph though"]

	function displayGif(){
		var topic = $(this).attr("data-name");
		var queryURL ="http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=56uYq7JLVc0ntzCICXjAnKxSDyNVuKyF&limit=10";

		$( "#gifs" ).empty();
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);
			for (var i=0; i < response.data.length; i++){
				var ratingDiv = $("<div class='rating'>");
				var rating = response.data[i].rating;
				var ratingUpper = rating.toUpperCase();
				var ratingDisplay = $('<p>').text("Rated: " + ratingUpper);
				$("#gifs").append(ratingDisplay);
				var newImage = $('<img>').attr('src', response.data[i].images.downsized_still.url);
				newImage.addClass("dynamic-images");
				newImage.attr('data-still', response.data[i].images.downsized_still.url);
				newImage.attr('data-animate', response.data[i].images.downsized.url);
				newImage.attr('data-state', 'still');
				$("#gifs").append(newImage);
			}	

		})
	}

	$(document).on("click", ".dynamic-images", function() {
		var state = $(this).attr('data-state');

	  if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
	});

	function renderButtons(){
		$("#buttons").empty();

		for (var i=0; i<topics.length; i++){
			var a = $("<button>");
			a.addClass("topic");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#buttons").append(a);
		}
	}

	function createButton(event){
		event.preventDefault();
		var newTopic = $('#topic-input').val().trim();
		var buttonNew = $("<button>");
		buttonNew.addClass("topic");
		buttonNew.attr("data-name", newTopic);
		buttonNew.text(newTopic);
		$("#buttons").append(buttonNew);
	}

	renderButtons();

 $(document).on("click", ".topic", displayGif);

 $("#add-topic").on("click", function(event) {
 	createButton(event);
 });