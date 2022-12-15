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
        var self = this;
		
		//---debugging
		this.tile_length = 15;
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
		var tile_number = 0;
		for(var row = 0; row < this.num_of_rows; row++)
		{
			for(var col = 0; col < this.num_of_cols; col++)
			{
				var a_tile = {};
                a_tile.pos = {
                    x: self.tile_length * col,
                    y: self.tile_length * row
                };
				//---set tile type
				if(this.mine_locs.includes(tile_number))
				{
					a_tile.type = "mine";
				}
				else
				{
					var num_of_adj_mines = 0;
					var arg_a = ((tile_number - this.num_of_cols) - 1);
					var arg_b = (tile_number - this.num_of_cols);
					var arg_c = ((tile_number - this.num_of_cols) + 1);
					var arg_d = (tile_number - 1);
					var arg_e = (tile_number + 1);
					var arg_f = ((tile_number + this.num_of_cols) - 1);
					var arg_g = (tile_number + this.num_of_cols);
					var arg_h = ((tile_number + this.num_of_cols) + 1);
					
					//---arg A
					if(row > 0)
					{
						if(col > 0)
						{
							if(self.mine_locs.includes(arg_a))
							{
								num_of_adj_mines++;
							}
							
						}
					}
					
					//---arg B
					if(row > 0)
					{
						if(self.mine_locs.includes(arg_b))
						{
							num_of_adj_mines++;
						}
					}
					
					//---arg C
					if(row > 0)
					{
						if(col < (self.num_of_cols - 1))
						{
							if(self.mine_locs.includes(arg_c))
							{
								num_of_adj_mines++;
							}
						}
					}
					
					//---arg D
					if(col > 0)
					{
						if(self.mine_locs.includes(arg_d))
						{
							num_of_adj_mines++;
						}
					}
					
					//---arg e
					if(col < (self.num_of_cols - 1))
					{
						if(self.mine_locs.includes(arg_e))
						{
							num_of_adj_mines++;
						}
					}
					
					//---arg F
					if(row < (this.num_of_rows - 1))
					{
						if(col > 0)
						{
							if(self.mine_locs.includes(arg_f))
							{
								num_of_adj_mines++;
							}
						}
					}
					
					//---arg G
					if(row < (this.num_of_rows - 1))
					{
						if(self.mine_locs.includes(arg_g))
						{
							num_of_adj_mines++;
						}
					}
					
					//---arg H
					if(row < (this.num_of_rows - 1))
					{
						if(col < (self.num_of_cols - 1))
						{
							if(self.mine_locs.includes(arg_h))
							{
								num_of_adj_mines++;
							}
						}
					}
					
					a_tile.number = num_of_adj_mines;
				}
				self.tile_array.push(a_tile);
				tile_number++;
			}
		}
		console.log(this.tile_array);
		
        this.update();
	},
	
	generateRandLocs: function()
	{
		do{
			var possible_loc = Math.floor(Math.random() * this.total_num_of_tiles);
		}while(this.mine_locs.includes(possible_loc));
		return possible_loc;
	},
	
	update: function()
    {
        requestAnimationFrame(this.update.bind(this));
        var self = this;
        //---clearing the grid
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        //---setting the grid background
        ctx.fillStyle = "#e3e3e3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = "4";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
		
		
        //---rendering each tile
		for(var tile = 0; tile < this.tile_array.length; tile++)
        {
            var self = this;
            ctx.save();
            ctx.fillStyle = "red";
            ctx.lineWidth = 4;
            ctx.strokeStyle = "green";
            ctx.strokeRect(self.tile_array[tile].pos.x, self.tile_array[tile].pos.y, (self.tile_array[tile].pos.x + self.tile_length), (self.tile_array[tile].pos.y + self.tile_length));
            //ctx.fillRect(self.tile_array[tile].pos.x, self.tile_array[tile].pos.y, (self.tile_array[tile].pos.x + self.tile_length), (self.tile_array[tile].pos.y + self.tile_length));
            ctx.restore();
        }
    },
}