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

window.onload = function()
{
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext('2d');
    canvas.width = "200";
    canvas.height = "200";
    console.log("hello");
	app.Grid.init();
}