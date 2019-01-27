$(document).on("click", "#show", function () {
    alert("You just scraped from elitedaily! Click the next button to show the articles!");
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data) {
        console.log(data);
    });
})

$(document).on("click", "#clear", function () {

    event.preventDefault();

    $.ajax({
        method: "GET",
        url: "/showall"
    }).then(function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#articledump").append("<div id='wrapper'>"
                + "<br>" + "<br>" + data[i].image
                + "<br>" + "<br>"
                + "<h2 class='header'>" + data[i].title + "</h2>"
                + "<h4 class='subheader'>" + data[i].subtitle + "</h4>"
                + "<button class='btn btn-danger savebtn' data-id='" + data[i]._id + "'>" + "Save Article" + "</button>"
                + " "
                + "<a href='" + "https://www.elitedaily.com" + data[i].link + "'" + 'target="blank"' + "'>"
                + "<button class='btn btn-info'>"
                + "Read More"
                + "</button>" + "</a>"
                + "<br>" + "</p>"
                + "<br>"
                + "</div>");
        }
    })

});

