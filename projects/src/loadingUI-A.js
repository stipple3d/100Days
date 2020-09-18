let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

//NOTE: kontra sets up the canvas and context and makes them globally accessible

//NOTE: all loaders on this page will be updating w/ the same
//		set of data

let loaders, currentValue, currentStage;

const useStages = false;

//simple data (if not using stages)
const valueAddedPerFrame = 1;
const startingValue = 10;
const targetValue = 600;

//stages of data (if selected)
const stages = [
{title: 'PRELOADING', message: 'loading the data', units: 'kb', 
startingValue: 0, targetValue: 65, valuePerFrame: 0.25},
{title: 'LOADING ASSETS: IMG', message: 'loading the images', units: 'images', 
startingValue: 0, targetValue: 35, valuePerFrame: 0.25},
{title: 'LOADING ASSETS: SOUND', message: 'loading the sound files', units: 'tracks', 
startingValue: 0, targetValue: 10, valuePerFrame: 0.1},
{title: 'LOADING MAP', message: 'loading the map', units: 'tiles', 
startingValue: 0, targetValue: 6000, valuePerFrame: 1}
];

function Setup(){

	//instantiate loaders array (to hold all loaders, all extend the Loader base class)
	loaders = [];

	//create loader instances and push them to the loaders array

	//BarLoader
	var bLoader = new BarLoader(startingValue, targetValue, 200, 10, 0, 100, 100);
	bLoader.setBgLine(1,'white');
	bLoader.setBgColor('white');
	bLoader.setProgressLine(1, 'black');
	bLoader.setProgressColor('#336699')
	loaders.push(bLoader);

	//init data in prepping state

	currentValue = startingValue;

	//define the game loop
	gameLoop = GameLoop({
	  update: function(dt) {

	  	//check the first loader in the loaders array to see if loading is complete
	  	//(only relevant for this test where there are many)
	  	//TODO: end loading based on a fired event "loadingComplete"

	  	//iterate the data before updating the loaders
	  	currentValue += valueAddedPerFrame;

	  	//if there are loaders to update, update them
	  	if(loaders.length > 0){
	  		for(var lo = 0; lo < loaders.length; lo++){
	  			loaders[lo].updateValue(currentValue);
	  		}
	  	}

	  },
	  render: function() {

	  	//draw debug rectangle where the bar loader should render
	  	

	  	//if there are loaders to draw, draw them
	  	if(loaders.length > 0){
	  		for(var lo = 0; lo < loaders.length; lo++){
	  			loaders[lo].drawLoader();
	  		}
	  	}
	  	/*context.save();
	  	context.beginPath();
		context.strokeStyle = 'white';
		context.strokeRect(100, 100, 200, 10);
		context.restore();*/


	  }
	});

	//start the game loop
	gameLoop.start();
}

Setup();