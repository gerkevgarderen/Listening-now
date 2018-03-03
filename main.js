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

function tenseOfText(nowplaying){
	if (!nowplaying){
		$('#header').html("Most <span>recent</span> listen")
	} else {
		$('#header').html("<span>Now</span> listening to")
	}
}