$(document).ready(function(){

	var initialUrl  = window.location.href;
	var getCleanUrl = "";
	var getParam    = "";
	var urlTest     = initialUrl.indexOf("?");

	if( urlTest == -1 )
		$("#submit").trigger("click");

	function getUrl() {
		
		var getFullUrl  = initialUrl.split("?");
		getCleanUrl     = getFullUrl[0];
		getParam        = getFullUrl[1];

		if (getParam != "")
			initialUrl = getParam;

	}

	function animateClouds(){

		var clouds     = document.getElementById('clouds');
		var cloudLeft  = document.getElementById('cloudLeft');
		var cloudRight = document.getElementById('cloudRight');

		TweenLite.to(clouds, 10, {opacity:0.5});
		TweenLite.fromTo(cloudLeft, 40, {x:0}, {x:90});
		TweenLite.fromTo(cloudRight, 20, {x:0}, {x:500});

	}

	if (window.innerWidth > 900 )
		animateClouds();

	var searchIcon  = document.getElementById('submit');
	var searchInput = document.getElementById('search');
	
	var searchVal   = "";
	
	$("#submit").on('click',function(){
			getUrl();
			searchVal   = $("#search").val();
			window.location.href = initialUrl + "#" + searchVal;
			
			if( searchVal != "")
				getData();
			
	});

	function getData(){

		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/songs?q="+searchVal;

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        var myArr = JSON.parse(xmlhttp.responseText);
		        myFunction(myArr);
		    }
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();

		function myFunction(arr) {
		    var songList = "";
		    var i;
		    for(i = 0; i < arr.length; i++) {
		    	songList += "<li class='col-md-12'><a class='playBtn' href='"+arr[i].url+"' target='_blank'></a><div class='song-details'><p class='title'>"+arr[i].songname+"</p><p class='artist'>"+arr[i].artistname+"</p></div><form><input type='radio' name='day' id='today'><label for='today' class='leftDay'>Today</label><input type='radio' name='day' id='friday'><label for='friday' class='rightDay'>Friday</label></form></li>";
		    }
		    $(".list-song-wrapper").append(songList);
		}

	}

});