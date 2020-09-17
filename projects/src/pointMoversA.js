let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

const pointsA = [{x: 50, y: 50}, {x: 200, y: 200}, {x: 300, y: 200}, {x: 500, y: 50}, {x: 400, y: 500}, {x: 250, y: 300}, {x: 100, y: 500}];
let pointsAVisuals = [];
let ptpAIndex = 1;
let ptpA;

function Setup(){

	//hard coding to start at zero index and then passing the first target as the index stored
	ptpA = new PointToPointMover(pointsA[0].x, pointsA[0].y, pointsA[ptpAIndex].x, pointsA[ptpAIndex].y);

	for(var d = 0; d < pointsA.length; d ++){
    	pointsAVisuals[d] = new visualDot(pointsA[d].x, pointsA[d].y, 12);
    }

	gameLoop = GameLoop({
	  update: function(dt) {

	  	//if we have reached the current dest, move to the next one
	  	if(ptpA.reachedDest){
	  		//increment and check that new index is in bounds
	  		ptpAIndex ++;
	  		if(ptpAIndex >= pointsA.length){
	  			//if we are past the last index, loop back to first index
	  			ptpAIndex = 0;
	  		}
	  		//pass the point mover its new target info
	  		ptpA.targetX = pointsA[ptpAIndex].x;
	  		ptpA.targetY = pointsA[ptpAIndex].y;
	  		//set reachedDest as false again
	  		ptpA.reachedDest = false;
	  	}

	  	//run update on the point mover
	    ptpA.update();

	  },
	  render: function() {
	  	//draw the point mover
	    ptpA.draw();

	    //draw all the point dot visuals
	    for(var d = 0; d < pointsAVisuals.length; d ++){
	    	pointsAVisuals[d].draw();
	    }

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