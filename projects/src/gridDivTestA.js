

//DATA
const gridRows = 20;
const gridCols = 20;
const gridCellWidth = 120;
const gridCellHeight = 120;

//GLOBAL VARS
let grid, messageText;

let gridManager;

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

	//TODO: try to find a way to edit the base style of the cells (not each one at a time)
	//		--want to edit cellWidth and cellHeight css attributes to adjsut the grid
	//			dynamically on runtime

	//modify grid size and gridCell size in CSS
	//grid.style.width = (gridCols * gridCellWidth).toString() + 'px';
	//grid.style.height = (gridRows * gridCellHeight).toString() + 'px';

	//create instance of GridManager and set it to creating the grid
	gridManager = new GridManager();

	

}