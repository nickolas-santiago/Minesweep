"use strict";
var app = app || {};
var canvas;
var ctx;

function getMouse(canvas, evt)
{
    var canvas_bounding_box = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - canvas_bounding_box.left,
        y: evt.clientY - canvas_bounding_box.top
    };
}
var mouse_pos = {
		x: 0,
		y: 0
}
var mousedown = false;

//---game buttons
function toggle_flagging()
{
	if(app.Game.flagging == false)
	{
		app.Game.flagging = true;
	}
	else
	{
		app.Game.flagging = false;
	}
}
function hint()
{
	console.log(app.Game.can_click);
	if((app.Game.current_state == "PLAYING") && (app.Game.hint_count > 0))
	{
		console.log("get a hint!");
		app.Grid.generateHint();
		app.Game.hint_count--;
		document.getElementById("hint_counter").innerHTML = "Hints Left: " + app.Game.hint_count;
	}
}
function new_game()
{
	console.log("hello");
	app.Game.gameNew();
}
window.onload = function()
{
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext('2d');
    canvas.width = "200";
    canvas.height = "200";
    console.log("hello");
	//---setting mouse events
	
	//app.Grid.init(20,5,8,5,30,30);
	app.Game.gameNew();
	console.log(app.Game.can_click);
	this.mousedown = false;
	canvas.addEventListener('mousemove', function(evt)
	{
		mouse_pos = getMouse(canvas, evt);
	});
	canvas.addEventListener('click', function(evt)
	{
		mousedown = true;
	});
	canvas.addEventListener('mousedown', function(evt)
	{
		
	});
	canvas.addEventListener('mouseup', function(evt)
	{
		mousedown = false;
	});
	
        
}