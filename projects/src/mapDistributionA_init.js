let canvas, context;
let s3dLoop;
let game;

function Setup(){
	game = new Game();
	s3dLoop = new s3dGameLoop(60, game.render, game.update);
	s3dLoop.startLoop();
}

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
    Setup();
});

const gameData = {

zonesWide: 7,
zonesHigh: 7,
minPerZone: 1,
maxPerZone: 6,
zoneEdgeBuffer: 20,
minDistBetween: 0,
startingChoiceMethod: 'random' //'random', 'centerZone', 'centerClosest'

};