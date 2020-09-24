let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

let diceImg;

function Preload(){
	//define the dice image
	diceImg = new Image();
	
	//set function to start game loop when the iamge is loaded
	diceImg.onload = function() {
	    // the image is ready
	    Setup();
	};
	//set the image src AFTER the onload function has been defined
	diceImg.src = '../images/set1.png';
}

function Setup(){

	console.log('diceImg nat w: ', diceImg.naturalWidth);

	gameLoop = GameLoop({
	  update: function(dt) {
	  

	  },
	  render: function() {

	  	context.drawImage(diceImg, 0,0,192,128);

	  }
	});

	gameLoop.start();
}

Preload();