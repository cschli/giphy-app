
var topics = ["final fantasy", "jumanji", "john wick", "friday", "sunshine", "cat", "disney"];
var favGifArrStill = [];
var favGifArrAnimate = [];
var favInfoArr = [];

$(document).ready(function () {
    //setting the initial topic buttons
    createTopic();

    //function to create topic buttons, used to create new topic buttons as well
    function createTopic() {
        $(".topic-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("btn btn-info");
            newButton.attr("data-value", topics[i]);
            newButton.text(topics[i]);
            $(".topic-buttons").append(newButton);
        }
        buttonRender();
    }

    //on click event for adding topics, which captures input field value, puts it into topic array, and recreats topic buttons
    $("#add-topic").on("click", function (response) {
        response.preventDefault();
        var newTopic = $("#topic-input").val().trim()
        //only send new topic if input field has trimmed value
        if (newTopic) {
            topics.push(newTopic);
            createTopic();
        } else {
            return;
        }
    })

    $(".clearGifs").on("click", function () {
        $(".gifs").empty();
    })

    $(".resetTopic").on("click", function () {
        topics = ["final fantasy", "jumanji", "john wick", "friday", "sunshine", "cat", "disney"];
        createTopic();
    })

    $(".favoriteDisplayButton").on("click", function () {
        $(".favoriteSection").attr("display", "block");
    })

    //adds functionality to buttons, making ajax call to get the appropriate gifs
    function buttonRender() {
        $("button").on("click", function () {
            var topic = $(this).data("value");
            console.log(topic);
            var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=sujw6VeMNKiA2XD2Nuz2tlP0qKK88gWX&limit=10"

            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
                //create gifs, give them the required data attributes, prepend them to page
                var objectData = response.data;
                for (var i = 0; i < objectData.length; i++) {
                    console.log(objectData)
                    var card = $("<div>");
                    card.addClass("imageContainer");
                    card.attr("style", "width: 100%");
                    card.attr("data-index", [i]);
                    var cardBody = $("<div>");
                    cardBody.addClass("card-body");
                    card.prepend(cardBody);
                    var source = $("<div>");
                    source.addClass("card-text");
                    source.html("<b>Source:</b> " + objectData[i].source);
                    cardBody.prepend(source);
                    var rating = $("<div>");
                    rating.addClass("card-text");
                    rating.html("<b>Rating:</b> " + (objectData[i].rating).toUpperCase());
                    cardBody.prepend(rating);
                    var title = $("<div>");
                    title.addClass("card-text");
                    title.html("<b>Title:</b> " + objectData[i].title);
                    cardBody.prepend(title);
                    var newGif = $("<img>");
                    newGif.addClass("gif");
                    newGif.attr("src", objectData[i].images.fixed_height_still.url);
                    newGif.attr("data-still", objectData[i].images.fixed_height_still.url);
                    newGif.attr("data-animate", objectData[i].images.fixed_height.url);
                    newGif.attr("data-state", "still");
                    newGif.attr("style", "width: 30%");
                    card.prepend(newGif);
                    var download = $('<a download></a>').attr("href", newGif.attr("data-animate"));
                    download.text("Download");
                    // var favorite = $("<button>");
                    // favorite.addClass("btn btn-primary addToFavorite");
                    // favorite.text("Add to Favorite");
                    cardBody.prepend(download);
                    // card.prepend(favorite);
                    $(".gifs").prepend(card);
                }

                // $(".addToFavorite").on("click", function () {


                // })

                //animate vs stop gifs
                $(".gif").on("click", function () {
                    if ($(this).attr("data-state") === "still") {
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", $(this).attr("data-animate"));
                    } else if ($(this).attr("data-state") === "animate") {
                        $(this).attr("data-state", "still");
                        $(this).attr("src", $(this).attr("data-still"));
                    }
                })

            })
        })
    }


})