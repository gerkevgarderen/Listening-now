// Determine image brightness
function getImageLightness(imageSrc, callback) {
	var img = document.createElement("img");
	img.crossOrigin = "Anonymous";
	img.src = imageSrc;
	img.style.display = "none";
	document.body.appendChild(img);

	var colorSum = 0;

	img.onload = function() {
		// Copied from: https://stackoverflow.com/a/13763063
		// create canvas
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0);

		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		var r, g, b, avg;

		for (var x = data.length/5, len = data.length / 2; x < len; x += 4) {
			r = data[x];
			g = data[x + 1];
			b = data[x + 2];

			avg = Math.floor((r + g + b) / 3);
			colorSum += avg;
		}

		var brightness = Math.floor(colorSum / (this.width * this.height) * 2);
		callback(brightness);
	}
}

// Update text colour based on brightness of image (i)
function updateColor(i) {
	var color;
	if (parseInt(i) > 122) {
		color = 'black';
	} else {
		color = 'white';
	}
	document.body.style.color = color;
	return 0;
}

// Update Text based on whether it is the current song, or a most recently listened track
function tenseOfText(nowplaying){
	if (!nowplaying){
		$('#header').html("Most <span>recent</span> listen")
	} else {
		$('#header').html("<span>Now</span> listening to")
	}
}

// Update the image and text for the track
function updateImage(url,track, trackUrl,artist,artistUrl, listening){
	current = trackUrl;
	console.log("check!");
	
	getImageLightness(url, function(brightness) {
		updateColor(brightness);
	});
		
	$("#pic1").attr("src", url);
	$('.background-image').css("background-image", "url(" + url + ")");
	$('#description').html("<a href='" + trackUrl + "' target='_blank'>" + track + "</a>" + " by " + "<a href='" + artistUrl + "' target='_blank'>" + artist + "</a>");

	tenseOfText(listening);
}

// SPOTIFY ONLY
// Update the audioplayer with the preview URL
function updateAudio (url){
	if (document.getElementById('audioSource').src != url){
		document.getElementById('audioSource').src = url;
		document.getElementById('audio').load();
	}
}