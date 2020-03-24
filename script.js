console.log($);

(function() {
    var userInput;
    var albumOrArtist;
    var url;
    var imageUrl;
    var nextUrl;

    $("#submit-button").on("mouseenter", function() {
        $("#submit-button").addClass("mouse-over");
    });

    $("#submit-button").on("mouseleave", function() {
        $("#submit-button").removeClass("mouse-over");
    });

    $("#submit-button").on("click", function() {
        userInput = $("input[name=user-input]").val();
        albumOrArtist = $("select").val();

        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                response = response.artists || response.albums;

                var myHtml = "";

                for (var i = 0; i < response.items.length; i++) {
                    url = response.items[i].external_urls.spotify;

                    imageUrl = "default.jpg";
                    if (response.items[i].images[0]) {
                        imageUrl = response.items[i].images[0].url;
                    }

                    myHtml +=
                        "<div class='result'>" +
                        '<a href="' +
                        url +
                        '">' +
                        '<img class="result-pic" src="' +
                        imageUrl +
                        '">' +
                        "</a>" +
                        '<a class="name" href="' +
                        url +
                        '">' +
                        response.items[i].name +
                        "</a>" +
                        "</div>";
                }

                var noResults = "";
                noResults += "<p>" + "No results for your search" + "</p>";

                if (response.total != 0) {
                    $("#results-container").html(myHtml);
                    $("#no-results").remove();
                } else {
                    // $("#more").addClass("hide");
                    $("#no-results").html(noResults);
                    $("#results-container").remove();
                    $("#more").remove();
                }

                if (response.total < 20) {
                    $("#more").remove();
                }

                $("#more").removeClass("hide");

                nextUrl =
                    response.next &&
                    response.next.replace(
                        "https://api.spotify.com/v1/search",
                        "https://elegant-croissant.glitch.me/spotify"
                    );
                if (response.next == "null") {
                    $("#more").hide();
                } else {
                    $("#more").show();
                }
            }
        });
    });

    $(document).on("click", "#more", function() {
        // $("#more").removeClass("hide");
        userInput = $("input[name=user-input]").val();
        albumOrArtist = $("select").val();

        $.ajax({
            url: nextUrl,
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                response = response.artists || response.albums;

                var myHtml = "";

                for (var i = 0; i < response.items.length; i++) {
                    url = response.items[i].external_urls.spotify;

                    imageUrl = "default.jpg";
                    if (response.items[i].images[0]) {
                        imageUrl = response.items[i].images[0].url;
                    }

                    myHtml +=
                        "<div class='result'>" +
                        '<a href="' +
                        url +
                        '">' +
                        '<img class="result-pic" src="' +
                        imageUrl +
                        '">' +
                        "</a>" +
                        '<a class="name" href="' +
                        url +
                        '">' +
                        response.items[i].name +
                        "</a>" +
                        "</div>";
                }

                var noResults = "";
                noResults += "<p>" + "No results for your search" + "</p>";

                if (response.total != 0) {
                    $("#results-container").append(myHtml);
                    $("#no-results").remove();
                }

                if (response.total < 20) {
                    $("#more").remove();
                }

                nextUrl =
                    response.next &&
                    response.next.replace(
                        "https://api.spotify.com/v1/search",
                        "https://elegant-croissant.glitch.me/spotify"
                    );
                if (response.next == "null") {
                    $("#more").hide();
                } else {
                    $("#more").show();
                }
            }
        });
    });
})();
