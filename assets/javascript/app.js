$(document).ready(function () {



	//Going to create the function to display buttons//

	var topics = ["jess", "homeless man", "Nic", "Schmidt"]

	function createButtons() {

		$("#movie-bank").empty();


		for (var i = 0; i < topics.length; i++) {

			var b = $("<button>");

			b.addClass("movie");

			b.attr("data-name", topics[i]);

			b.text(topics[i]);

			$("#movie-bank").append(b);
		}
	}

	//adding movie as button from textbox
	$("#add-movie").on("click", function (event) {
		event.preventDefault()

		submittedMovie = $("#movie-input").val().trim()

		topics.push(submittedMovie);

		createButtons();

		$("#movie-input").val("")
	})
	createButtons();

})
// this will fill up ten gifs when clicking the button
$(document).on("click", "button", function () {

	newTopic = $(this).attr("data-name").trim()

	console.log(newTopic)

	var newGirlUrl = "https://api.giphy.com/v1/gifs/search?q=new+girl+" + newTopic + "&api_key=CDShKlngqPnXqkad2QD187OWTLvwuYeN&limit=10"

	$.ajax({
		url: newGirlUrl,
		method: "GET"
	})
		.then(function (response) {
			console.log(response);
			console.log(response.data.length)

			$("#gifs").empty()

			for (var j = 0; j < response.data.length; j++) {
				figure = $("<figure>")

				figure.addClass("figure-" + j)

				caption = $("<figcaption>")

				caption.text("Rating: " + response.data[j].rating)

				gif = $("<img>");

				gif.addClass("gif");

				gif.attr("src", response.data[j].images.downsized_still.url);

				gif.attr("data-still", response.data[j].images.downsized_still.url);

				gif.attr("data-animate", response.data[j].images.downsized.url)

				gif.attr("data-state", "still");

				$("#gifs").append(figure);

				$(".figure-" + j).append(gif);

				$(".figure-" + j).append(caption);


			}

			// this will make the gifs play or pause when you click on them
			$(".gif").on("click", function () {

				var state = $(this).attr("data-state");

				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				}
				else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still")
				}

			})

		})



})


