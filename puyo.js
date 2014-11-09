   var fallInterval = 40; //interval (in ticks) at which the block falls
   var currentBlock;
   //var nextColor1 = generateColor();
   //var nextColor2 = generateColor();
   var width = 300; //canvas width
   var height = 600; //canvas height
   var radius = 25; //icon radius
   var numberOfBlocksUsed = 0;
   var gameGrid; //accessed with [ycoord][xcoord]
   var globalGroups = [];
   var globalCounter = 0;
   var spaceId = 0; //to id each space
   var floor = new Array(height - radius, height - radius, height - radius, 
   height - radius, height - radius, height - radius); // an array that keeps track of the height of the blocks at each x-coord
  
   var pair = function (block)  { //this structure will keep track of the orientation for rotations
		this.block = block;
		this.pivot = block.getChildAt(0);
		this.rotatable = block.getChildAt(1);
		this.orientation = 12; //orientation based on clock face, starts at 12 O'clock
		function rotateClockwise()  {
			
		}
		function rotateCounterClockwise()  {
		
		}
	}
	var space = function ()  { //each space keeps track of occupancy and occupant
		var thisSpace = this;
		thisSpace.occupied = false;
		thisSpace.id = spaceId;
		spaceId++;
		thisSpace.circle = null;
		thisSpace.getCircle = function getCircle()  {
			return thisSpace.circle;
		}
		thisSpace.setCircle = function setCircle(newCircle)  {
			thisSpace.circle = newCircle;
			thisSpace.occupied = true;
		}
		thisSpace.isOccupied = function isOccupied()  {
			return thisSpace.occupied;
		}
	}
	
   function init() {
		var stage = new createjs.Stage("demoCanvas");
		var counter = 0;
		var keyBuffer = 0;
		gameGrid = new Array(6);
		for (var i = 0; i < 12; i++)  { //this loop creates the grid
			gameGrid[i] = new Array(12);
		}
		for (var i = 0; i < 12; i++)  {
			for (var j = 0; j < 6; j++)  { //populates grid with spaces
				gameGrid[i][j] = new space();
			}
		}
		currentBlock = generateBlock();
		stage.addChild(currentBlock);
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", stage);
		createjs.Ticker.addEventListener("tick", tick);
		function tick(event) {
			fallingBlock(currentBlock);
			if (keyBuffer == 0)  {
				if (key.isPressed('left') && !hitFloor(currentBlock)) {
					moveLeft(currentBlock);
					keyBuffer++;
					stage.update();
				}
				if (key.isPressed('right') && !hitFloor(currentBlock)) {
					moveRight(currentBlock);
					keyBuffer++;
					stage.update();
				}
				if (key.isPressed('down')) {
					moveDown(currentBlock);
					keyBuffer++;
					stage.update();
				}
			}
			if (keyBuffer != 0)  { //prevents keypress from registering too quickly: it's a bit clunky right now
				keyBuffer++;
				if (keyBuffer == 6)  {
					keyBuffer = 0;
				}
			}	
		}
		function generateBlock()  { //creates a new block of two icons
			var circle1 = new createjs.Shape();
			var circle2 = new createjs.Shape();
			circle1.color = generateColor();
			circle2.color = generateColor();
			//nextColor1 = generateColor();
			//nextColor2 = generateColor();
			var block = new createjs.Container();
			counter = 0;
			keyBuffer = 0;
			circle1.graphics.beginFill(circle1.color).drawCircle(0, 0, radius);
			circle1.x = 0;
			circle1.specialX = 0;
			circle1.y = 0;
			circle1.specialY = 0;
			circle2.graphics.beginFill(circle2.color).drawCircle(0, 0, radius);
			circle2.x = 0;
			circle2.specialX = 0;
			circle2.y = -50;
			circle2.specialY = 0;
			block.addChild(circle1, circle2);
			block.x = 175;
			block.y = 25;
			numberOfBlocksUsed++;
			return block;
		}
		function generateColor() {
			var x = Math.random();
			if(x<.20) return "green";
			else if(x<.40) return "pink";
			else if(x<.60) return "blue";
			else if(x<.80) return "purple";
			else return "orange";
		}
		function fallingBlock(block)  {
			if (counter == fallInterval)  {
				moveDown(block);	
			}
			counter++;
		}
		function moveDown(block)  {
			if (!hitFloor(block))  {
				block.y = block.y + 50;
				counter = 0;
				stage.update();
			}
			else  {
				//This will need to be changed to either 50 or 100 depending on the rotations made
				floor[xToArray(block.x)] -= 100;
				/* SUPER IMPORTANT TODO:
				 * Need to make sure each circle has the proper coordinates here. The values I'm assigning here aren't accurate if there's a rotation
				 */
				//Can't edit these without making them disappear. Need to figure out how to edit a block's
				//child circles without making the block go invisible
				var x = block.x;
				var y = block.y;
				block.getChildAt(0).specialX = x;
				block.getChildAt(0).specialY = y;
				block.getChildAt(1).specialX = x;
				block.getChildAt(1).specialY = y-50;

				gameGrid[yToArray(block.y)][xToArray(block.x)].setCircle(block.getChildAt(0));  //adds circles to grid
				gameGrid[yToArray(block.y) - 1][xToArray(block.x)].setCircle(block.getChildAt(1));
				
				updateGroups(block.getChildAt(0));
				updateGroups(block.getChildAt(1));
				//updateBoard();
				
				currentBlock = generateBlock();
				speedUp();
				stage.addChild(currentBlock);
			}
		}
		function moveLeft(block)  {
			if (block.x > 25)  {
				block.x -= 50;
			}
		}
		function moveRight(block)  {
			if (block.x < width - radius)  {
				block.x += 50;
			}
		}
		function hitFloor(block)  { //checks if  block has reached the bottom 
			if (block.y >= floor[xToArray(block.x)]) {
				return true;
			}
			return false;
		}
		
		function updateBoard() {
		/* Iterate through all the groups in the global group list.
		 * If the group size is >=4, then delete the group from the global
		 * group list and the board.
		 */
			var i;
			var j;
			for(i = 0; i < globalGroups.length; i++){
				if(globalGroups[i].size >= 4){
					for(j = 0; j < globalGroups[i].elements.length; j++){
						stage.removeChild(globalGroups[i].elements[j]);
					}
					//Delete the item from the array
					globalGroups.splice(i, 1);
				}
			}
		}
		
		function updateGroups(circle){
		/* This function is meant to update the groups everytime a block reaches the 
		 * floor. For a circle in the block it should check all adjacent groups 
		 * (adjacent groups found using getGroupList()) and check if the group is the 
		 * same color as it. If it is, add 1 to the group size and add yourself to
		 * the elements. If no groups are your color, a new group needs to be created.
		 * IMPORTANT: If two groups of the same color are next to you, the groups need
		 * to be merged. (Because while they used to be separate groups, you've just
		 * come in and connected them.)
		 */
			var groups = getGroupList(circle);
			var index;
			var foundGroup = false;
			for(index = 0; index < groups.length; index++){
				if(groups[index].color == circle.color){
					groups[index].elements[groups[index].elements.length] = circle;
					groups[index].size = groups.size+1;
					foundGroup = true;
				}
			}
			if(!foundGroup){
				//No group to join, make a new one
				var newGroup = new group(globalCounter++, circle.color, 1, [circle]);
				globalGroups[globalGroups.length] = newGroup;
				circle.group = newGroup;
			}
		}
		
		function getGroupList(circle) {
		/* This function takes in a circle and returns an array of the IDs of every group
		 * that the circles above, below, left, and right of it are. Before adding a new group
		 * to the array, it checks if the id is already present.
		 * (In simple terms, imagine O is the circle that is input. This function should 
		 * return an array containing the group ids of the circles A, L, R, and B with no duplicates.)
		 *         A 
		 *       L O R 
		 *         B
		 */
			var groups = [];
			var x = circle.specialX;
			var y = circle.specialY;
			if(yToArray(y)+1<=11){
				if(gameGrid[yToArray(y)+1][xToArray(x)].isOccupied()){
					var A = gameGrid[yToArray(y)+1][xToArray(x)].getCircle();
					if(A.group != null) groups[groups.length] = A.group;
				}
			}
			if(yToArray(y)-1>=0){
				if(gameGrid[yToArray(y)-1][xToArray(x)].isOccupied()){
					var B = gameGrid[yToArray(y)-1][xToArray(x)].getCircle();
					if(B.group != null){
						if(!isInGroup(B.group.id, groups)){
							groups[groups.length] = B.group;
						}
					}
				}
			}
			if(xToArray(x)-1>=0){
				if(gameGrid[yToArray(y)][xToArray(x)-1].isOccupied()){
					var L = gameGrid[yToArray(y)][xToArray(x)-1].getCircle();
					if(L.group != null){
						if(!isInGroup(L.group.id, groups)){
							groups[groups.length] = L.group;			
						}
					}
				}
			}
			if(xToArray(x)+1<=5){
				if(gameGrid[yToArray(y)][xToArray(x)+1].isOccupied()){
					var R = gameGrid[yToArray(y)][xToArray(x)+1].getCircle();
					if(R.group != null){
						if(!isInGroup(R.group.id, groups)){
							groups[groups.length] = R.group;
						}
					}
				}
			}
			return groups;
		}
		
		function isInGroup(Id, groups) {
		/* Checks whether or not the given Id is already in groups 
		 * to avoid duplicates
		 */
			var index;
			for(index = 0; index < groups.length; index++){
				if(groups[index].id == Id) return true;
			}
			return false;
		}
		
		function mergeGroups(groups){
		/* Merge two groups
		 *
		 */
		}
		
		function group(id, color, size, elements){
			this.id = id;
			this.color = color;
			this.size = size;
			this.elements = elements;
		}
		
	}
	
function xToArray(coord)  { //converts x-coordinate to array index
	return Math.floor(coord/(2*radius))
}

function yToArray(coord)  { //converts y-coordinate to array index
	return Math.floor(coord/(2*radius))
}

function speedUp(){
             console.log(numberOfBlocksUsed);
             if (numberOfBlocksUsed % 4 == 0 && fallInterval > 5) { //speed increases every 4th block
                          fallInterval = fallInterval -5;
             }
             if (numberOfBlocksUsed % 50 == 0 && fallInterval > 3) { // 50th block reaches max speed
                          fallInterval = fallInterval - 1;
             }
             console.log(fallInterval);
             
}	
