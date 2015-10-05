function id(el) {
	return document.getElementById(el);
};

//From Javascript The Good Parts
Array.matrix = function (m, n, initial) {
	var a, i, j, mat = [];
	for (i = 0; i < m; i += 1) {
		a = [];
		for (j = 0; j < n; j += 1) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};

var options = {
	gridContainer : "wrapper",
	cellClass : "cell",
	deadCellColor : "white",
	aliveCellColor : "red"
};

var Cell = function(grid) {
	var parent = grid;
	this.domObject = document.createElement("div");
	this.domObject.className = options.cellClass;
  this.domObject.model = this;
	this.alive = false;

	this.kill = function() {
		this.domObject.style.backgroundColor = options.deadCellColor;
		this.alive = false;	
	};
	this.revive = function() {
		this.domObject.style.backgroundColor = options.aliveCellColor;
		this.alive = true;
	};
	this.domObject.onclick = function() { 
		this.model.alive ? this.model.kill() : this.model.revive();
	};
};

var Grid = function(x, y) {
	this.x = x;
	this.y = y;
	this.cellGrid = Array.matrix(x, y, 0);
	this.init = function() {
		for(var i = 0; i < x; i++) {
			for(var j = 0; j < y; j++) {
				var cell = new Cell(this);
				id(options.gridContainer).appendChild(cell.domObject);
				this.cellGrid[i][j] = cell;
			}
		}
	}
  this.getNeighbourgs = function(x, y) {
    var total = 0;
    if(this.cellGrid[x - 1][y].alive) total++;
    if(this.cellGrid[x + 1][y].alive) total++;
    if(this.cellGrid[x][y - 1].alive) total++;
    if(this.cellGrid[x][y + 1].alive) total++;
    if(this.cellGrid[x + 1][y + 1].alive) total++;
    if(this.cellGrid[x - 1][y - 1].alive) total++;
    if(this.cellGrid[x + 1][y - 1].alive) total++;
    if(this.cellGrid[x - 1][y + 1].alive) total++;

    return total;
  }
	this.simulate = function() {
    var n = 0;
		for(var i = 0; i < x; i++) {
			for(var j = 0; j < y; j++) {
		  	this.cellGrid[i][j].alive ? this.cellGrid[i][j].kill() : this.cellGrid[i][j].revive(); 
        n = getNeighbourgs(i,j);
        if(this.cellGrid[i][j].alive && (1 > n || n > 4 )) this.cellGrid[i][j].kill();
        else if(!this.cellGrid[i][j].alive && n==3) this.cellGrid[i][j].revive();
			}
		}
	}
};

function stopSimulation() {
	id("start-button").innerHTML = "Start";
	id("start-button").onclick = function() { simulate(grid) };
	clearInterval(interval);
};

function simulate(grid) {
	id("start-button").innerHTML = "Stop";
	id("start-button").onclick = function() { stopSimulation() };
	interval = setInterval(function() {
		grid.simulate();
	}, 1000);
};

var gridWidth = 10;
var gridHeight = 10;
var grid = new Grid(gridHeight, gridWidth);

window.onload = function() {
	grid.init();
	id("start-button").onclick = function() {simulate(grid)};
};