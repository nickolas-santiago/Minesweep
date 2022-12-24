"use strict";
var app = app || {};
app.Game = {
	//Properties
	current_points: undefined,
	current_state: undefined, //---states: PLAYING, WIN_SCREEN, LOSE_SCREEN
	flagging: undefined,
	flag_count: undefined,
	hint_count: undefined,
	timer: undefined,
	current_time: undefined,
	can_click: undefined,
	
	//Methods
	gameNew: function()
	{
		var self = this;
		this.current_points = 0;
		this.current_state = "PLAYING";
		this.flagging = false;
		this.can_click = true;
		
		var num_of_cols =8;
		var num_of_rows = 5;
		var num_of_mines = 5;
		
		this.flag_count = num_of_mines;
		this.hint_count = 3;
		this.current_time = 0;
		
		app.Grid.init(20,num_of_cols,num_of_rows,num_of_mines,30,30);
		document.getElementById("hint_counter").innerHTML = "Hints Left: " + app.Game.hint_count;
		document.getElementById("flag_counter").innerHTML = "Flags Left: " + app.Game.flag_count;
		console.log(this.timer);
		if(this.timer != undefined)
		{
			clearInterval(this.timer());
		}
		this.setTimer();
		this.beginTimer();
	},
	
	beginTimer: function()
	{
		var self = this;
		this.timer = window.setInterval(function()
		{
			self.current_time++;
			self.setTimer();
		}, 1000);
		
		//clearInterval(this.timer());
		console.log(this.timer);
	},
	setTimer: function()
	{
		document.getElementById("timer").innerHTML = "Timer: " + this.current_time;
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