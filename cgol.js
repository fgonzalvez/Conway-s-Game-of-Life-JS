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
	cellClass : "cell"
};

var Cell = function(grid) {
	var parent = grid;
	this.domObject = document.createElement('div');
	this.domObject.className = 'cell';
	this.alive = false;
	this.domObject.onclick = function() { 
		if(this.alive) {
			this.style.backgroundColor = "white";
			this.alive = false;	
		} else {
			this.style.backgroundColor = "red";
			this.alive = true;			
		}
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
	this.simulate = function() {
	for(var i = 0; i < x; i++) {
		for(var j = 0; j < y; j++) {
			
		}
	}
	}
};

function stopSimulation() {
	id("start-button").innerHTML = "Start";
	id("start-button").onclick = function() {simulate(grid)};
	clearInterval(interval);
};

function simulate(grid) {
	id("start-button").innerHTML = "Stop";
	id("start-button").onclick = function() {stopSimulation()};
	interval = setInterval(function() {
		/*for(var i = 0; i < grid.x; i++) {
			for(var j = 0; j < grid.y; j++) {
				if(grid.cellGrid[i][j])
			}
		}*/
		grid.simulate();
	}, 1000);
};

window.onload = function() {
	var grid = Grid(10,10);
	id("start-button").onclick = function() {simulate(grid)};
};