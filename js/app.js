"use strict";
 
 $("form").submit(function(evt){
 	evt.preventDefault();
	
    var $search = $("#search"); 	
	var $submit = $("#submit");
	$search.prop("disabled", true);
    $submit.attr("disabled", true).val("Searching...");

    var movieRequest = $search.val();
    var omdbUrl = "http://www.omdbapi.com/";
    var omdbOpts = {
    	s: movieRequest,
        r: "json"
    };

    function searchMovie(data){
        $.each(data.Search, function(i, movie){    //use Ajax again to get specific info from each search result.
            movieRequest = movie.Title;
            omdbOpts = {
                t: movieRequest,
                r: "json",
                y: movie.Year
            };
            $.getJSON(omdbUrl, omdbOpts, displayMovie);
        }); // end of each

        $("#container").css("height", "auto");
        $search.prop("disabled", false);
        $search.prop("value", " ");
        $submit.attr("disabled", false).val("Search");
    }   // end of searchMovie
        
    function displayMovie(data){
        var movieInfo = " ";
            
        if(data.Title === undefined){  // Check to see if there are any movies with that title
            // do nothing
        } else{
            movieInfo += "<div class='results'>";
            
            if(data.Poster === "N/A"){  //Check to see if there is a poster image available.
                movieInfo += "<img class='poster' src='img/no-image.jpg' alt='" + data.Title + "'/>";
            } else{
                movieInfo += "<img class='poster' src='" + data.Poster + "' alt='" + data.Title + "'/>";
            }
            
            movieInfo += "<ul class='movie-details'>"; 
            movieInfo += '<li><span>Title: </span> ' + data.Title + '</li>';
            movieInfo += '<li><span>Year Released: </span> ' + data.Released + '</li>';
            movieInfo += '<li><span>Genre: </span> ' + data.Genre + '</li>';
            movieInfo += '<li><span>Plot: </span> ' + data.Plot + '</li>';	
            movieInfo += '<li><span>Director: </span> ' + data.Director + '</li>';	
            movieInfo += '<li><span>Cast: </span> ' + data.Actors + '</li>';	
            movieInfo += '<li><span>Runtime: </span>' + data.Runtime + '</li>';	
            movieInfo += '<li><span>Rated: </span>' + data.Rated + '</li>';
            movieInfo += '<li><span>Rating: </span>' + data.imdbRating + '</li>';
            movieInfo += '<li><span>Type: </span>' + data.Type + '</li>';
            movieInfo += '<li><span>Awards: </span>' + data.Awards + '</li>';
            movieInfo += '<li><span>Country: </span>' + data.Country + '</li>';
            movieInfo += "</ul></div>";
            $("#all-movies").append(movieInfo);
        } //end of if-else    
    }    // end of displayMovie
           
    $("#all-movies").html("");
    $.getJSON(omdbUrl, omdbOpts, searchMovie);
});  //end of form submit function