(function() {
    var userInput;
    var albumOrArtist;
    var url;
    var imageUrl;
    var nextUrl;

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

                    imageUrl = "/default.jpg";
                    if (response.items[i].images[0]) {
                        imageUrl = response.items[i].images[0].url;
                    }

                    myHtml +=
                        "<div>" +
                        '<a href="' +
                        url +
                        '">' +
                        '<img src="' +
                        imageUrl +
                        '">' +
                        "</a>" +
                        '<a href="' +
                        url +
                        '">' +
                        response.items[i].name +
                        "</a>" +
                        "</div>";
                }

                var noResults = "";
                noResults += "<div>" + "No results" + "</div>";

                if (response.total != 0) {
                    $("#results-container").html(myHtml);
                    $("#no-results").remove();
                } else {
                    $("#no-results").html(noResults);
                    $("#results-container").remove();
                }
                nextUrl =
                   response.next &&
                   response.next.replace(
                       "https://api.spotify.com/v1/search",
                       "https://elegant-croissant.glitch.me/spotify"
                   );
                   if (nextUrl == "null") {
                       $("more").hide();
                   } else {
                       $("#more").show();
                   }
            }
        });
    });
}());







// Principios generales para oranizar codigo
// 1 Entendible / inteligible
// 2 No repetir
// 3. reusabilidad
// 4. YAGNI (you're not gonna need it). No sobrecomplicar

// more con event delegation

// las dos funciones estan al mismo nivel, no una dentro de la otra

$(document).on("click". "#more", function(e){

});

// quitar type y val

al final usar append en vez de html

function nextUrl(next) {
    next && next.replace(
        //two args, what you wanna replace and what with
        "https://api.spotify.com/v1/search",
        "https://elegant-croissant.glitch.me/spotify"
    );
}

function(data.next);

function getResultsHtml(items) {
    var myHtml = "";
    for (
        var i = 0;
        i < response.items.length;
        i++
    ) {
        console.log(response.items[i].name);

        var url =
            response.items[i].external_urls.spotify;
        console.log(url);

        var imageUrl = "/default.jpg";
        if (response.items[i].images[0]) {
            imageUrl =
                response.items[i].images[0].url;
        }
        myHtml +=
            "<div>" +
            '<a href="' +
            url +
            '">' +
            '<img src="' +
            imageUrl +
            '">' +
            "</a>" +
            '<a href="' +
            url +
            '">' +
            response.items[i].name +
            "</a>" +
            "</div>";
    }
 return getResultsHtml;

}


// una funcion para los dos click handlers

(document).on("click", "#more, #go", function(e){
    if (e.target.id == go) {
        data = {
            ...
        }
    }
});



// next stage Infinite scroll
// crear una funcion para revisar si el usuario scrolleo hasta abajo,

function checkScroll(){
    if (hasReachedBottom) {
        get more results
    } else {
        setTimeout(checkScroll(), 500)
    }

necesitamos document.body.clientHeight

$(document).height()

altura de la pagina

iinerHeight o $(window).height() para saber el alto de la ventana

pageYOffset $(document)scrollTop(); para saber que tanto ha scrolleado el usuario

para saber si el usuario scrolleo hasta abajo

si scrollTop + windowheight = document height, el usuario llego hasta abajo, para asegurar agregar un buffer de -100

if you get more, stop checkein

}

$(document).scrollTop() + $(window).height() >= $(document).height() - 100;
