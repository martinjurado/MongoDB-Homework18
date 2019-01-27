// Scrape!
$(document).on("click", "#show", function () {

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (data) {
        console.log(data);
    });
})

// Append all scraped articles
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
                + "<button class='btn btn-danger savebtn' data-id='" + data[i]._id + "'>"
                + "Save Article"
                + "</button>"
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

$(document).on("click", ".savebtn", function () {

    var thisId = $(this).attr("data-id");

    alert("You just saved an article");

    $.ajax({
        method: "GET",
        url: "/showall/" + thisId
    }).then(function (data) {
        console.log(data);
    })
});

$(document).on("click", "#show", function () {

    $("#savedump").empty();
    $("#savedump").append("You haven't saved anything yet!");

    $.ajax({
        type: "DELETE",
        url: "/deleteall"
    }).then(function () {
        location.reload()
    })
});

// Append all scraped articles
function showSaved() {

    event.preventDefault();

    $.ajax({
        method: "GET",
        url: "/showsaved"
    }).then(function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#savedump").append("<div id='wrapper'>"
                + "<br>" + "<br>" + data[i].image
                + "<br>" + "<br>"
                + "<h2 class='header'>" + data[i].title + "</h2>"
                + "<h4 class='subheader'>" + data[i].subtitle + "</h4>"
                + "<button class='btn btn-warning deletebtn' data-id='" + data[i]._id + "'>"
                + "Delete"
                + "</button>"
                + " "
                + "<a href='" + "https://www.elitedaily.com" + data[i].link + "'" + 'target="blank"' + "'>"
                + "<button class='btn btn-info'>"
                + "Read More"
                + "</button>" + "</a>"
                + "<br>" + "</p>"
                + "<br>"
                + "</div>");
            // Delete saved article from database 
            $(document).on("click", ".deletebtn", function () {

                var deleteID = $(this).attr("data-id");
                $.ajax({
                    url: "/deleteart/" + deleteID,
                    type: "DELETE"
                }).then(function () {
                    location.reload();
                });
            });
        }
    })
};

$(document).ready(function () {
    showSaved();
});
