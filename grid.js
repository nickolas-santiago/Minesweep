"use strict"
var app = app || {};
app.Grid = {
    //Properties
	//---related to dimensions
    tile_length: undefined,
	num_of_cols: undefined,
	num_of_rows: undefined,
	height: undefined,
	width: undefined,
	total_num_of_tiles: undefined,
	pos: {
		x: undefined,
		y: undefined
	},
	//---related to mines
	num_of_mines: undefined,
	mine_locs: [],
	//
	tile_array: [],
	
	//Methods
	init: function()
	{
		//---debugging
		this.tile_length = 4;
		this.num_of_cols = 4;
		this.num_of_rows = 4;
		this.num_of_mines = 4;
		
		//---initiate dimensions of the grid
		this.height = (this.num_of_cols * this.tile_length);
		this.width = (this.num_of_rows * this.tile_length);
		this.total_num_of_tiles = (this.num_of_cols * this.num_of_rows);
		
		//---generate mine locations
		for(let m = 0; m < this.num_of_mines; m++)
		{
			var mine_loc = this.generateRandLocs();
			this.mine_locs.push(mine_loc);
		}
		
		//---fill tile array with tile objects
		for(let tile = 0; tile < this.total_num_of_tiles; tile++)
		{
			var a_tile = {};
			a_tile.pos = {};
			a_tile.pos.x = ((tile%this.num_of_cols) * this.tile_length)
			a_tile.pos.y = (Math.floor(tile/this.num_of_rows) * this.tile_length)
			console.log(a_tile.pos.y);
			console.log(a_tile.pos.x);
			//---set tile types
			if(this.mine_locs.includes(tile))
			{
				a_tile.type = "mine";
			}
			console.log(a_tile);
		}
	},
	
	generateRandLocs: function()
	{
		do{
			var possible_loc = Math.floor(Math.random() * this.total_num_of_tiles);
		}while(this.mine_locs.includes(possible_loc));
		return possible_loc;
	}
}