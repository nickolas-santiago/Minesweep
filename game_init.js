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

window.onload = function()
{
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext('2d');
    canvas.width = "200";
    canvas.height = "200";
    console.log("hello");
	//---setting mouse events
	this.mousedown = false;
	canvas.addEventListener('mousemove', function(evt)
	{
		mouse_pos = getMouse(canvas, evt);
	});
	canvas.addEventListener('mousedown', function(evt)
	{
		mousedown = true;
		console.log("yerrrrr");
	});
	canvas.addEventListener('mouseup', function(evt)
	{
		mousedown = false;
	});
        
	app.Grid.init(20,5,8,5,30,30);
}