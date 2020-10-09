

//DATA
const gridRows = 10;
const gridCols = 10;
//const gridCellWidth = 120;
//const gridCellHeight = 120;

//GLOBAL VARS
let grid, messageText;

let gridCells;

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	//get elements from the HTML
	grid = document.querySelector('#grid');
	messageText = document.querySelector('#message');
	//run game setup
    SetupGame();
});

//setup function for game
function SetupGame(){

	gridCells = [];

	var index = 0;
	var cellDiv;

	for(var row = 0; row < gridRows; row++){
		//gridCells[row] = [];
		for(var col = 0; col < gridCols; col++){

			cellDiv = document.createElement('div');
			if(Math.random() > .5)
				cellDiv.className = 'land';
			//this.cellDiv.innerHTML = this.colIndex + ', ' + this.rowIndex;
			grid.appendChild(cellDiv);
			gridCells.push(cellDiv);

		}
	}



}