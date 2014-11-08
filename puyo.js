   var fallInterval = 40; //interval (in ticks) at which the block falls
   var currentBlock;
   //var nextColor1 = generateColor();
   //var nextColor2 = generateColor();
   var width = 300; //canvas width
   var height = 600; //canvas height
   var radius = 25; //icon radius
   var numberOfBlocksUsed = 0;
   var floor = new Array(height - radius, height - radius, height - radius, 
   height - radius, height - radius, height - radius); // an array that keeps track of the height of the blocks at each x-coord
   function init() {
		var stage = new createjs.Stage("demoCanvas");
		var counter = 0;
		var keyBuffer = 0;
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
			circle1.y = 0;
			circle2.graphics.beginFill(circle2.color).drawCircle(0, 0, radius);
			circle2.x = 0;
			circle2.y = -50;
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
				floor[xToArray(block.x)] -= 100
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
		
				function updateBoard(){
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
				globalGroups[globalGroups.length] = new group(globalCounter++, circle.color, 1, [circle]);
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
			var A = gameGrid[xToArray(circle.x)][yToArray(circle.y+1)];
			var B = gameGrid[xToArray(circle.x)][yToArray(circle.y-1)];
			var L = gameGrid[xToArray(circle.x-1)][yToArray(circle.y)];
			var R = gameGrid[xToArray(circle.x+1)][yToArray(circle.y)];
			groups[groups.length] = A.circle.group.id;
			if(!isInGroup(B.circle.group.id, groups)){
				groups[groups.length] = B.circle.group;
			}
			if(!isInGroup(L.circle.group.id, groups)){
				groups[groups.length] = L.circle.group;			
			}
			if(!isInGroup(R.circle.group.id, groups)){
				groups[groups.length] = R.circle.group;
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
