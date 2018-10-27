

let topics = ["horse", "duck", "cat", "dog", "bee"];

for (var i = 0; i < topics.length; i++) {
    $("#button" + i).each(function () {
        $(this).attr("topic", topics[i]);
        $(this).text(topics[i]);
        console.log(this);
    })
}

$("button").on("click", function () {

    var category = $(this).attr("topic");
    var URL = "https://api.giphy.com/v1/gifs/search?q=" +
        category + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: URL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                
                //gifImage.attr("state", "still");

                //givDiv.addClass("number" + i);
                gifDiv.addClass("dooHicky");
                gifDiv.prepend(gifImage);
                gifDiv.prepend(p);

                $("#gifs-zone").prepend(gifDiv);
            }
        });
});

$(".dooHicky").on("click", function() {
    console.log("you clicked!");
    var srcStill = $(this).attr("src");
    var srcAnimate = srcStill + "_s";
    console.log(srcAnimate);

    $(this).attr("src", srcAnimate);
    //$(this).attr("state", "still");
    
})
