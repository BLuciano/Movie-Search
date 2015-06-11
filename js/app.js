"use strict";
$(document).ready(function(){
 	$("form").submit(function(evt){
 		evt.preventDefault();
	
        var $search = $("#search"); 	
	    var $submit = $("#submit");

	    $search.prop("disabled", true);
        $submit.attr("disabled", true).val("Searching...");

        var movieRequest = $search.val();
        var omdbUrl = "http://www.omdbapi.com/";
        var omdbOpts = {
        	t: movieRequest,
            r: "json"
        };

        function displayMovie(data){
        	var posterImage = "<img id='poster' src=";
        	var movieInfo = "<ul id='movie-details'>"; 
        
        	posterImage += "'" + data.Poster + "' alt='" + data.Title +"'/>";
        	movieInfo += '<li><span>Title: </span> ' + data.Title + '</li>';
        	movieInfo += '<li><span>Year Released: </span> ' + data.Released + '</li>';
        	movieInfo += '<li><span>Genre: </span> ' + data.Genre + '</li>';
        	movieInfo += '<li><span>Plot: </span> ' + data.Plot + '</li>';	
        	movieInfo += '<li><span>Director: </span> ' + data.Director + '</li>';	
        	movieInfo += '<li><span>Cast: </span> ' + data.Actors + '</li>';	
        	movieInfo += '<li><span>Runtime: </span>' + data.Runtime + '</li>';	
        	movieInfo += '<li><span>Rated: </span>' + data.Rated + '</li>';
        	movieInfo += '<li><span>Rating: </span>' + data.imdbRating + '</li>';
        	movieInfo += "</ul>";

            $("#container").css("height", "auto");
            $("#results").css("display", "block");
           
        	$("#results").html(posterImage);
        	$("#results").append(movieInfo);
        	$search.prop("disabled", false);
        	$search.prop("value", " ");
        	$submit.attr("disabled", false).val("Search");
        } //end displayMovie function

        $.getJSON(omdbUrl, omdbOpts, displayMovie);
 	});  //end of form submit function
});  //end of ready function