"use strict";
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
	//---related to individual tiles
	tile_array: [],
	revealed_tiles: undefined,
	//---related to mines
	num_of_mines: undefined,
	mine_locs: [],	
	
	//Methods
	init: function(tile_length_, num_of_cols_, num_of_rows_, num_of_mines_, pos_x_, pos_y_)
	{
        var self = this;
		//---initiate the grid
		//---inherited values
		this.tile_length = tile_length_;
		this.num_of_cols = num_of_cols_;
		this.num_of_rows = num_of_rows_;
		this.num_of_mines = num_of_mines_;
		this.pos.x = pos_x_;
		this.pos.y = pos_y_;
		//---calculations from inherited values
		this.width = (this.num_of_cols * this.tile_length);
		this.height = (this.num_of_rows * this.tile_length);
		this.total_num_of_tiles = (this.num_of_cols * this.num_of_rows);
		this.tile_array = [];
		this.mine_locs = [];
		this.revealed_tiles = 0;
		
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
                    x: (self.pos.x + (self.tile_length * col)),
                    y: (self.pos.y + (self.tile_length * row))
                };
				a_tile.row = row;
				a_tile.col = col;
				a_tile.reveal_status = "unrevealed";
				a_tile.flagged = false;
				//---set tile type
				if(this.mine_locs.includes(tile_number))
				{
					a_tile.type = "mine";
				}
				else
				{
					var num_of_adj_mines = 0;
					//---check tiles above the current tile
					if(row > 0)
					{
						if(col > 0)
						{
							if(self.mine_locs.includes((tile_number - this.num_of_cols) - 1))
							{
								num_of_adj_mines++;
							}
						}
						if(col < (self.num_of_cols - 1))
						{
							if(self.mine_locs.includes((tile_number - this.num_of_cols) + 1))
							{
								num_of_adj_mines++;
							}
						}
						if(self.mine_locs.includes(tile_number - this.num_of_cols))
						{
							num_of_adj_mines++;
						}
					}
					//---check tiles below the current tile
					if(row < (this.num_of_rows - 1))
					{
						if(col > 0)
						{
							if(self.mine_locs.includes((tile_number + this.num_of_cols) - 1))
							{
								num_of_adj_mines++;
							}
						}
						if(col < (self.num_of_cols - 1))
						{
							if(self.mine_locs.includes((tile_number + this.num_of_cols) + 1))
							{
								num_of_adj_mines++;
							}
						}
						if(self.mine_locs.includes(tile_number + this.num_of_cols))
						{
							num_of_adj_mines++;
						}
					}
					//---check tiles on the same row as the current tile
					if(col > 0)
					{
						if(self.mine_locs.includes(tile_number - 1))
						{
							num_of_adj_mines++;
						}
					}
					if(col < (self.num_of_cols - 1))
					{
						if(self.mine_locs.includes(tile_number + 1))
						{
							num_of_adj_mines++;
						}
					}
					//---finish setting tile types
					if(num_of_adj_mines > 0)
					{
						a_tile.type = "number";
						a_tile.number = num_of_adj_mines;
					}
					else
					{
						a_tile.type = "empty";

					}
				}
				self.tile_array.push(a_tile);
				tile_number++;
			}
		}
		console.log(this.tile_array);
		//---animate the grid
        this.update();
	},
	
	generateRandLocs: function()
	{
		do{
			var possible_loc = Math.floor(Math.random() * this.total_num_of_tiles);
		}while(this.mine_locs.includes(possible_loc));
		return possible_loc;
	},
	
	loseGame: function()
	{
		var self = this;
		for(var tile = 0; tile < self.mine_locs.length; tile++)
		{
			self.tile_array[self.mine_locs[tile]].reveal_status = "revealed";
		}
		app.Game.gameLose();
	},
	
	winGame: function()
	{
		app.Game.gameWin();
	},
	
	findEmptyAndNumberTiles: function(tile_, tiles_to_reveal_)
	{
		var self = this;
		//---check surrounding tiles and reveal them; if they are an empty tile, run this function again
		if(self.tile_array[tile_].row > 0)
		{
			if(self.tile_array[tile_].col > 0)
			{
				if((self.tile_array[(tile_ - self.num_of_cols) - 1].reveal_status == "unrevealed") && (self.tile_array[(tile_ - self.num_of_cols) - 1].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[(tile_ - self.num_of_cols) - 1]) == false))
				{
					tiles_to_reveal_.push(self.tile_array[(tile_ - self.num_of_cols) - 1]);
					if(self.tile_array[(tile_ - self.num_of_cols) - 1].type == "empty")
					{
						self.findEmptyAndNumberTiles(((tile_ - self.num_of_cols) - 1), tiles_to_reveal_);
					}
				}
			}
			if(self.tile_array[tile_].col < (self.num_of_cols - 1))
			{
				if((self.tile_array[(tile_ - self.num_of_cols) + 1].reveal_status == "unrevealed") && (self.tile_array[(tile_ - self.num_of_cols) + 1].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[(tile_ - self.num_of_cols) + 1]) == false))
				{
					tiles_to_reveal_.push(self.tile_array[(tile_ - self.num_of_cols) + 1]);
					if(self.tile_array[(tile_ - self.num_of_cols) + 1].type == "empty")
					{
						self.findEmptyAndNumberTiles(((tile_ - self.num_of_cols) + 1), tiles_to_reveal_);
					}
				}
			}
			if((self.tile_array[tile_ - self.num_of_cols].reveal_status == "unrevealed") && (self.tile_array[tile_ - self.num_of_cols].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[tile_ - self.num_of_cols]) == false))
			{
				tiles_to_reveal_.push(self.tile_array[tile_ - self.num_of_cols]);
				if(self.tile_array[tile_ - self.num_of_cols].type == "empty")
				{
					self.findEmptyAndNumberTiles((tile_ - self.num_of_cols), tiles_to_reveal_);
				}
			}
		}
		if(self.tile_array[tile_].row < (self.num_of_rows - 1))
		{
			if(self.tile_array[tile_].col > 0)
			{
				
				if((self.tile_array[(tile_ + self.num_of_cols) - 1].reveal_status == "unrevealed") && (self.tile_array[(tile_ + self.num_of_cols) - 1].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[(tile_ + self.num_of_cols) - 1]) == false))
				{
					tiles_to_reveal_.push(self.tile_array[(tile_ + self.num_of_cols) - 1]);
					if(self.tile_array[(tile_ + self.num_of_cols) - 1].type == "empty")
					{
						self.findEmptyAndNumberTiles(((tile_ + self.num_of_cols) - 1), tiles_to_reveal_);
					}
				}
			}
			if(self.tile_array[tile_].col < (self.num_of_cols - 1))
			{
				
				if((self.tile_array[(tile_ + self.num_of_cols) + 1].reveal_status == "unrevealed") && (self.tile_array[(tile_ + self.num_of_cols) + 1].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[(tile_ + self.num_of_cols) + 1]) == false))
				{
					tiles_to_reveal_.push(self.tile_array[(tile_ + self.num_of_cols) + 1]);
					if(self.tile_array[(tile_ + self.num_of_cols) + 1].type == "empty")
					{
						self.findEmptyAndNumberTiles(((tile_ + self.num_of_cols) + 1), tiles_to_reveal_);
					}
				}
			}
			if((self.tile_array[tile_ + self.num_of_cols].reveal_status == "unrevealed") && (self.tile_array[tile_ + self.num_of_cols].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[tile_ + self.num_of_cols]) == false))
			{
				tiles_to_reveal_.push(self.tile_array[tile_ + self.num_of_cols]);
				if(self.tile_array[tile_ + self.num_of_cols].type == "empty")
				{
					self.findEmptyAndNumberTiles((tile_ + self.num_of_cols), tiles_to_reveal_);
				}
			}
		}
		if(self.tile_array[tile_].col > 0)
		{
			if((self.tile_array[tile_ - 1].reveal_status == "unrevealed") && (self.tile_array[tile_ - 1].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[tile_ - 1]) == false))
			{
				tiles_to_reveal_.push(self.tile_array[tile_ - 1]);
				if(self.tile_array[tile_ - 1].type == "empty")
				{
					self.findEmptyAndNumberTiles((tile_ - 1), tiles_to_reveal_);
				}
			}
		}
		if(self.tile_array[tile_].col < (self.num_of_cols - 1))
		{
			if((self.tile_array[tile_ + 1].reveal_status == "unrevealed") && (self.tile_array[tile_ + 1].flagged == false) && (tiles_to_reveal_.includes(self.tile_array[tile_ + 1]) == false))
			{
				tiles_to_reveal_.push(self.tile_array[tile_ + 1]);
				if(self.tile_array[tile_ + 1].type == "empty")
				{
					self.findEmptyAndNumberTiles((tile_ + 1), tiles_to_reveal_);
				}
			}
		}
	},
	
	generateHint()
	{
		do{
			var possible_hint = Math.floor(Math.random() * this.total_num_of_tiles);
		}while(this.mine_locs.includes(possible_hint));
		if(this.tile_array[possible_hint].reveal_status == "unrevealed")
		{
			this.tile_array[possible_hint].reveal_status = "revealed";
			this.revealed_tiles++;
			if(this.revealed_tiles == (this.total_num_of_tiles - this.num_of_mines))
			{
				this.winGame();
			}
		}
		else{
			this.generateHint();
		}
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
		
		for(var tile = 0; tile < this.tile_array.length; tile++)
        {
			//---rendering each tile
            var self = this;
            if(self.tile_array[tile].reveal_status == "revealed")
			{
				ctx.save();
				ctx.fillStyle = "red";
				ctx.lineWidth = 4;
				ctx.strokeStyle = "green";
				ctx.strokeRect(self.tile_array[tile].pos.x, self.tile_array[tile].pos.y, self.tile_length, self.tile_length);
				ctx.fillRect(self.tile_array[tile].pos.x, self.tile_array[tile].pos.y, self.tile_length, self.tile_length);
				ctx.restore();
				if(self.tile_array[tile].type == "number")
				{
					ctx.save();
					ctx.fillStyle = "black";
					ctx.font = "10px Montserrat";
					ctx.textBaseline = "middle";
					ctx.textAlign = 'center';
					ctx.fillText(self.tile_array[tile].number, (self.tile_array[tile].pos.x + (self.tile_length/2)), (self.tile_array[tile].pos.y + (self.tile_length/2)));
					ctx.restore();
				}
				else if(self.tile_array[tile].type == "mine")
				{
					ctx.save();
					ctx.fillStyle = "black";
					ctx.beginPath();
					ctx.arc((self.tile_array[tile].pos.x + (self.tile_length/2)), (self.tile_array[tile].pos.y + (self.tile_length/2)), (self.tile_length/3), 0, 2 * Math.PI);
					ctx.stroke();
					ctx.restore();
				}
			}
			else
			{
				ctx.save();
				ctx.fillStyle = "white";
				ctx.fillRect(self.tile_array[tile].pos.x, self.tile_array[tile].pos.y, self.tile_length, self.tile_length);
				ctx.restore();
				if(self.tile_array[tile].flagged == true)
				{
					ctx.save();
					ctx.fillStyle = "black";
					ctx.fillRect(self.tile_array[tile].pos.x, self.tile_array[tile].pos.y, self.tile_length, self.tile_length);
					ctx.restore();
				}
			}
			
			//---check each tile to see if the mouse is hovering over it
			if(app.Game.can_click)
			{
				if((mouse_pos.x >= self.tile_array[tile].pos.x) && (mouse_pos.x <= (self.tile_array[tile].pos.x + self.tile_length) && (mouse_pos.y >= self.tile_array[tile].pos.y) && (mouse_pos.y <= (self.tile_array[tile].pos.y + self.tile_length))))
				{
					//---if the mouse is clicked on an unrevealed tile and ...
					if(mousedown == true)
					{
						if(app.Game.flagging == false)
						{
							if(self.tile_array[tile].reveal_status == "unrevealed")
							{
								//---... the tile is a number tile, reveal it
								if(self.tile_array[tile].type == "number")
								{
									self.tile_array[tile].reveal_status = "revealed";
									self.revealed_tiles++;
									app.Game.current_points++;
									console.log("Current Points: "+ app.Game.current_points);
									console.log(self.tile_array[tile]);
									//---check if player won
									if(app.Game.current_points == (this.total_num_of_tiles - this.num_of_mines))
									{
										self.winGame();
									}
								}
								//---... the tile is a mine tile, reveal all mines and games ends
								else if(self.tile_array[tile].type == "mine")
								{
									self.loseGame();
								}
								//---... the tile is an empty tile, reveal it and all adj number and empty tiles 
								else if(self.tile_array[tile].type == "empty")
								{
									console.log("empty");
									var tiles_to_reveal = [];
									tiles_to_reveal.push(self.tile_array[tile]);
									self.findEmptyAndNumberTiles(tile, tiles_to_reveal);
									//---now reveal all the tiles
									for(var tile_ = 0; tile_ < tiles_to_reveal.length; tile_++)
									{
										tiles_to_reveal[tile_].reveal_status = "revealed";
										self.revealed_tiles++;
										app.Game.current_points++;
										console.log("Current Points: "+ app.Game.current_points);
										console.log(tiles_to_reveal[tile_]);
										//---check if player won
										if(app.Game.current_points == (this.total_num_of_tiles - this.num_of_mines))
										{
											self.winGame();
										}
									}
								}
								if(self.tile_array[tile].flagged == true)
								{
									self.tile_array[tile].flagged = false;
									app.Game.flag_count++;
									document.getElementById("flag_counter").innerHTML = "Flags Left: " + app.Game.flag_count;
								}
							}
						}
						else
						{
							//---when flagging is true, change wether or not a tile is flagged
							if(self.tile_array[tile].reveal_status == "unrevealed")
							{
								if(self.tile_array[tile].flagged == false)
								{
									self.tile_array[tile].flagged = true;
									app.Game.flag_count--;
								}
								else
								{
									self.tile_array[tile].flagged = false;
									app.Game.flag_count++;
								}
								console.log(app.Game.flag_count);
								document.getElementById("flag_counter").innerHTML = "Flags Left: " + app.Game.flag_count;
							}
						}
						mousedown = false;
					}
				}
			}
			
		}		
    }
}