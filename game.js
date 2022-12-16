"use strict";
var app = app || {};
app.Game = {
	//Properties
	current_points: undefined,
	current_state: undefined, //---states: PLAYING, WIN_SCREEN, LOSE_SCREEN
	flagging: undefined,
	can_click: undefined,
	
	//Methods
	gameNew: function()
	{
		this.current_points = 0;
		this.current_state = "PLAYING";
		this.flagging = false;
		this.can_click = true;
		
		var num_of_cols =8;
		var num_of_rows = 5;
		var num_of_mines = 1;
		app.Grid.init(20,num_of_cols,num_of_rows,num_of_mines,30,30);
	},
	
	gameWin: function()
	{
		this.current_state = "WIN_SCREEN"
		this.can_click = false;
		console.log("YOU WIN");
	},
	
	gameLose: function()
	{
		this.current_state = "LOSE_SCREEN"
		this.can_click = false;
		console.log("YOU LOSE");
	}
}