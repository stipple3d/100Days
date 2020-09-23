let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

let gridLines;
let rectA;
function Setup(){

	gridLines = new GridLines();

	rectA = new Rect(80, 80, 10, 10, '#8ac80b', '#555', 1, 25);

	gameLoop = GameLoop({
	  update: function(dt) {
	  

	  },
	  render: function() {
	  	rectA.draw();
	  	gridLines.draw();

	  	
	  }
	});

	gameLoop.start();

	// Create linear gradient
	/*var lGrd = context.createLinearGradient(0, 0, 200, 0);
	lGrd.addColorStop(0, "red");
	lGrd.addColorStop(1, "white");

	// Fill with gradient
	context.fillStyle = lGrd;
	context.fillRect(300, 10, 150, 80);
	context.closePath();
	

	context.fillStyle = cGrd;
	context.fillRect(300, 200, 150, 80);

	context.moveTo(100, 100);
	context.lineTo(500, 500);
	context.stroke();

	// Create circular gradient
	var cGrd = context.createRadialGradient(75, 50, 5, 90, 60, 100);
	cGrd.addColorStop(0, "blue");
	cGrd.addColorStop(1, "white");

	context.beginPath();
	context.fillStyle = cGrd;
	context.arc(300, 300, 100, 0, 2 * Math.PI);
	context.fill();
	context.stroke();
	context.closePath();

	context.beginPath();
	context.rect(100, 100, 400, 400);
	context.stroke();
	context.closePath();

	context.font = "30px Arial";
	context.fillText("Hello World", 10, 50);

	context.font = "30px Arial";
	context.strokeText("Hello World", 10, canvas.height - 50);*/
}

Setup();