//Set Global Variables

// creates global variables for each Simple Image object
var originalImage = null;
var filter1Image = null;
var filter2Image = null;
var filter3Image = null;
var filter4Image = null;
var filter5Image = null;
var filter6Image = null;
var filter7Image = null;
var filter8Image = null;
var filter9Image = null;

// creates a global variable for the canvas and a context for the canvas
var canvas1 = document.getElementById("main_canvas");
var ctx = canvas1.getContext("2d");

var uploadedImage = null;

// file upload - gets image and creates many SimpleImages (one for each filter image)
function fileUpload() {
  uploadedImage = document.getElementById("file_chooser");
  originalImage = new SimpleImage(uploadedImage);
  filter1Image = new SimpleImage(uploadedImage);
  filter2Image = new SimpleImage(uploadedImage);
  filter3Image = new SimpleImage(uploadedImage);
  filter4Image = new SimpleImage(uploadedImage);
  filter5Image = new SimpleImage(uploadedImage);
  filter6Image = new SimpleImage(uploadedImage);
  filter7Image = new SimpleImage(uploadedImage);
  filter8Image = new SimpleImage(uploadedImage);
  filter9Image = new SimpleImage(uploadedImage);

  originalImage.drawTo(canvas1);
}

// Grayscale Filter
function filter1() {
  imageTest(originalImage);
  imageTest(filter1Image);
  doGray();
  filter1Image.drawTo(canvas1);
}

// Red Filter
function filter2() {
  imageTest(originalImage);
  imageTest(filter2Image);
  doRed();
  filter2Image.drawTo(canvas1);
}

// Noise Filter Filter
function filter3() {
  imageTest(originalImage);
  imageTest(filter3Image);
  doNoise();
  filter3Image.drawTo(canvas1);
}

// draw lines filter
function filter4() {
  imageTest(originalImage);
  imageTest(filter4Image);
  doLines();
}

// draw circles filter
function filter5() {
  imageTest(originalImage);
  imageTest(filter5Image);
  doCircles();
}

// draw lines with circles filter
function filter6() {
  imageTest(originalImage);
  imageTest(filter6Image);
  doCirclesWithLines();
}

// draw heart filter
function filter7() {
  imageTest(originalImage);
  imageTest(filter7Image);
  doHearts();
}

//Reset the Image
function resetImage() {
  imageTest(originalImage);
  originalImage = new SimpleImage(uploadedImage);
  filter1Image = new SimpleImage(uploadedImage);
  filter2Image = new SimpleImage(uploadedImage);
  filter3Image = new SimpleImage(uploadedImage);
  filter4Image = new SimpleImage(uploadedImage);
  originalImage.drawTo(canvas1);
}

//Test that Image is loaded - Accept image as parameter
function imageTest(image_var) {
  if (image_var == null || !image_var.complete()) {
    alert("Image Not Loaded");
  }
}

//Filter to change image to grayscale
function doGray() {
  for (var pixel of filter1Image.values()) {
    var origRed = pixel.getRed();
    var origGreen = pixel.getGreen();
    var origBlue = pixel.getBlue();
    var avgColor = (origRed + origGreen + origBlue) / 3;
    pixel.setRed(avgColor);
    pixel.setGreen(avgColor);
    pixel.setBlue(avgColor);
  }
}

//filter to give image red hue
function doRed() {
  for (var pixel of filter2Image.values()) {
    var r = pixel.getRed();
    var g = pixel.getGreen();
    var b = pixel.getBlue();
    var rgbAverage = (r + g + b) / 3;
    if (rgbAverage < 128) {
      pixel.setRed(rgbAverage * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(rgbAverage * 2 - 255);
      pixel.setBlue(rgbAverage * 2 - 255);
    }
  }
}

//filter to create random lines with colors of underlying image pixels
function doLines() {
  clearCanvas();
  radius = getRadius();
  lWidth = getLineWidth();
  iterations = getIterations();
  for (var i = 0; i < iterations; i++) {
    var canvasRandX = getRandomX();
    var canvasRandY = getRandomY();

    var redValue = filter4Image.getRed(canvasRandX, canvasRandY);
    var greenValue = filter4Image.getGreen(canvasRandX, canvasRandY);
    var blueValue = filter4Image.getBlue(canvasRandX, canvasRandY);

    ctx.strokeStyle =
      "rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")";
    ctx.lineWidth = getLineWidth();

    // calculates random radian for angle 1
    var angle1 = 2 * Math.PI * Math.random();

    // ensures angle2 is a positive radian (for ease of future reference)
    if (angle1 - Math.PI > 0) {
      var angle2 = angle1 - Math.PI;
    } else {
      var angle2 = 2 * Math.PI + (angle1 - Math.PI);
    }

    //draws lines
    ctx.beginPath();
    ctx.moveTo(
      parseInt(radius) * Math.cos(angle1) + parseInt(canvasRandX),
      parseInt(radius) * Math.sin(angle1) + parseInt(canvasRandY)
    );
    ctx.lineTo(
      parseInt(radius) * Math.cos(angle2) + parseInt(canvasRandX),
      parseInt(radius) * Math.sin(angle2) + parseInt(canvasRandY)
    );
    ctx.stroke();
  }
}

//filters to create random circles with bisecting lines with colors of underlying image pixels
function doCirclesWithLines() {
  clearCanvas();
  radius = getRadius();
  iterations = getIterations();
  for (var i = 0; i < iterations; i++) {
    var canvasRandX = getRandomX();
    var canvasRandY = getRandomY();

    var redValue = filter6Image.getRed(canvasRandX, canvasRandY);
    var greenValue = filter6Image.getGreen(canvasRandX, canvasRandY);
    var blueValue = filter6Image.getBlue(canvasRandX, canvasRandY);

    ctx.strokeStyle =
      "rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")";
    ctx.lineWidth = getLineWidth();
    ctx.beginPath();
    ctx.arc(canvasRandX, canvasRandY, radius, 0, 360);
    ctx.stroke();

    // calculates random radian for angle 1
    var angle1 = 2 * Math.PI * Math.random();

    // ensures angle2 is a positive radian (for ease of future reference)
    if (angle1 - Math.PI > 0) {
      var angle2 = angle1 - Math.PI;
    } else {
      var angle2 = 2 * Math.PI + (angle1 - Math.PI);
    }

    //draws lines
    ctx.beginPath();
    ctx.moveTo(
      parseInt(radius) * Math.cos(angle1) + parseInt(canvasRandX),
      parseInt(radius) * Math.sin(angle1) + parseInt(canvasRandY)
    );
    ctx.lineTo(
      parseInt(radius) * Math.cos(angle2) + parseInt(canvasRandX),
      parseInt(radius) * Math.sin(angle2) + parseInt(canvasRandY)
    );
    ctx.stroke();
  }
}

//filters to create random circles with colors of underlying image pixels

function doCircles() {
  clearCanvas();
  radius = getRadius();
  iterations = getIterations();
  for (var i = 0; i < iterations; i++) {
    var canvasRandX = getRandomX();
    var canvasRandY = getRandomY();

    var redValue = filter5Image.getRed(canvasRandX, canvasRandY);
    var greenValue = filter5Image.getGreen(canvasRandX, canvasRandY);
    var blueValue = filter5Image.getBlue(canvasRandX, canvasRandY);

    ctx.strokeStyle =
      "rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")";
    ctx.lineWidth = getLineWidth();
    ctx.beginPath();
    ctx.arc(canvasRandX, canvasRandY, radius, 0, 360);
    ctx.stroke();
  }
}

//clears the canvas
function clearCanvas() {
  var ctx = canvas1.getContext("2d");
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
}

//returns user input values for iterations
function getIterations() {
  var iterations = document.getElementById("noOfIters").value;
  return parseInt(iterations);
}

//returns user input values for line width
function getLineWidth() {
  var lineWidth = document.getElementById("lineWidthInput").value;
  return parseInt(lineWidth);
}

//returns a random number canvas width
function getRandomX() {
  return Math.trunc(Math.random() * canvas1.width);
}

//returns a random number canvas height
function getRandomY() {
  return Math.trunc(Math.random() * canvas1.height);
}

//retrives user input values for size (radius)
function getRadius() {
  var radius = document.getElementById("radInput").value;
  return parseInt(radius);
}

//retrives user input values for noise level
function getNoiseLevel() {
  var noiseLevel = document.getElementById("valNoiseLevel").value;
  return parseInt(noiseLevel);
}

//retrives user input values for heart size
function getHeartSize() {
  var heartSize = document.getElementById("valHeartSize").value;
  return parseInt(heartSize);
}

//retrives user input values for heart iterations
function getHeartIterations() {
  var heartIts = document.getElementById("valHeartIterations").value;
  return parseInt(heartIts);
}

//function for creating noise filter
function doNoise() {
  var noiseLevel = getNoiseLevel();
  for (var pixel of filter3Image.values()) {
    var r = pixel.getRed();
    var g = pixel.getGreen();
    var b = pixel.getBlue();
    var redRand = Math.trunc(Math.random() * (noiseLevel + 1));
    var greenRand = Math.trunc(Math.random() * (noiseLevel + 1));
    var blueRand = Math.trunc(Math.random() * (noiseLevel + 1));
    var redDecision = Math.trunc(Math.random() * 2);
    var blueDecision = Math.trunc(Math.random() * 2);
    var greenDecision = Math.trunc(Math.random() * 2);

    if (redDecision === 0 && r > noiseLevel) {
      r = r - redRand;
    }

    if (redDecision == 1 && r < 255 - noiseLevel) {
      r = r + redRand;
    }

    if (greenDecision === 0 && g > noiseLevel) {
      g = g - greenRand;
    }

    if (greenDecision == 1 && g < 255 - noiseLevel) {
      g = g + greenRand;
    }

    if (blueDecision === 0 && b > noiseLevel) {
      b = b - blueRand;
    }

    if (blueDecision == 1 && b < 255 - noiseLevel) {
      b = b + blueRand;
    }

    pixel.setRed(r);
    pixel.setGreen(g);
    pixel.setBlue(b);
  }
}

//function that creates random hearts
function doHearts() {
  clearCanvas();
  var hIterations = getHeartIterations();
  for (var i = 0; i < hIterations; i++) {
    var lsAngle = Math.PI * 0.75;
    var rsAngle = Math.PI * 0.25;
    var xMult = 1.4;
    var bottY = 2.0;

    var xVal = getRandomX();
    var yVal = getRandomY();

    var rCol = filter7Image.getRed(xVal, yVal);
    var gCol = filter7Image.getGreen(xVal, yVal);
    var bCol = filter5Image.getBlue(xVal, yVal);

    var pickerValue = "rgb(" + rCol + "," + gCol + "," + bCol + ")";

    var sizeVal = getHeartSize();

    var rCircMid = parseInt(xVal) + parseInt(sizeVal) * xMult;
    var centerXOverlap = (parseInt(xVal) + rCircMid) / 2;

    ctx.strokeStyle = pickerValue;

    //left circle of heart
    ctx.beginPath();
    ctx.arc(xVal, yVal, sizeVal, 0, 360);
    ctx.stroke();
    ctx.fillStyle = pickerValue;
    ctx.fill();

    //right circle of heart
    ctx.beginPath();
    ctx.arc(rCircMid, yVal, sizeVal, 0, 360);
    ctx.stroke();
    ctx.fillStyle = pickerValue;
    ctx.fill();

    //triangle on bottom of heart

    ctx.beginPath();
    ctx.moveTo(
      parseInt(sizeVal) * Math.cos(lsAngle) + parseInt(xVal),
      parseInt(sizeVal) * Math.sin(lsAngle) + parseInt(yVal)
    );
    ctx.lineTo(centerXOverlap, parseInt(yVal) + parseInt(sizeVal) * bottY);
    ctx.lineTo(
      parseInt(sizeVal) * Math.cos(rsAngle) +
        parseInt(xVal) +
        parseInt(sizeVal) * xMult,
      parseInt(sizeVal) * Math.sin(rsAngle) + parseInt(yVal)
    );
    ctx.stroke();

    ctx.lineTo(
      parseInt(sizeVal) * Math.cos(lsAngle) + parseInt(xVal),
      parseInt(sizeVal) * Math.sin(lsAngle) + parseInt(yVal)
    );
    ctx.stroke();

    ctx.fillStyle = pickerValue;
    ctx.fill();
  }
}