

let topics = ["running man", "wile e coyote", "purple people eater", "syrup", "puss in boots"];

function renderButtons() {
    $("#buttons").empty();
    i = 0;

    for (var i = 0; i < topics.length; i++) {
        var buttMaker = $("<button>");
        //buttMaker.addClass("#button" + i);
        buttMaker.attr("topic", topics[i]);
        console.log(buttMaker);
        buttMaker.text(topics[i]);
        buttMaker.addClass("topicButton");

        $("#buttons").append(buttMaker);
        //console.log(buttMaker);
    }
}

renderButtons();

$("#add-button").on("click", function (event) {
    event.preventDefault();

    var topic = $("#button-input").val().trim();

    //console.log(topic);
    topics.push(topic);
    console.log(topics);

    renderButtons();

});



$(".topicButton").on("click", function (event) {
    event.preventDefault();
    alert("you clicked a button");

    $("#gifs-zone").empty();

    var category = $(this).attr("topic");
    var URL = "https://api.giphy.com/v1/gifs/search?q=" +
        category + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(URL);


    $.ajax({
        url: URL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            //console.log(response);
            for (var j = 0; j < results.length; j++) {
                var gifDiv = $("<div>");

                var rating = results[j].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("state", "animated");
                gifImage.attr("srcA", results[j].images.fixed_height.url);
                gifImage.attr("srcS", results[j].images.fixed_height_still.url);
                gifImage.attr("src", results[j].images.fixed_height.url);
                gifImage.addClass("gif");

                //console.log(gifImage);
                //gifImage.attr("state", "still");

                //givDiv.addClass("number" + i);
                gifDiv.prepend(gifImage);
                gifDiv.prepend(p);
                //console.log(gifDiv);

                $("#gifs-zone").prepend(gifDiv);
            }
        });
});

/// all of these .on("click" 's are here because I cannot seem to get the clicking on the image to work, at all

$(".gif").on("click", function (event) {
    event.preventDefault();
    alert("you clicked .gif!");
    var state = $(this).attr("state");
    var urlA = $(this).attr("urlA");
    var urlS = $(this).attr("urlS");

    if (state === "animated") {
        $(this).attr("src", urlS);
        $(this).attr("state", "still");
    } else if (state === "still") {
        $(this).attr("src", urlA);
        $(this).attr("state", "animated");
    }

    // var srcStill = $(this).attr("src");
    //var srcAnimate = srcStill + "_s";
    // console.log(srcAnimate);

    // $(this).attr("src", srcAnimate);
    //$(this).attr("state", "still");

});

