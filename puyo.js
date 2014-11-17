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
   var currentScore = 0;
   var highScore = 0;
   var spaceId = 0; //to id each space
   var timer;
   var currentTime = 0;
   var hasBeenSet = false;
   var stage;

   var floor = new Array(height - radius, height - radius, height - radius,
       height - radius, height - radius, height - radius); // an array that keeps track of the height of the blocks at each x-coord

   var pair = function(block) { //this structure will keep track of the orientation for rotations
       thisPair = this;
       thisPair.block = block;
       thisPair.pivot = block.getChildAt(0);
       thisPair.rotatable = block.getChildAt(1);
       thisPair.orientation = 12; //orientation based on clock face, starts at 12 O'clock
       thisPair.rotateCW = function rotateCW() {
           if (thisPair.orientation == 12 && thisPair.block.x + thisPair.rotatable.x + 50 <= width - radius) {
               thisPair.rotatable.x += 50;
               thisPair.rotatable.y += 50;
               thisPair.orientation = 3;
           } else if (thisPair.orientation == 3) {
               thisPair.rotatable.x -= 50;
               thisPair.rotatable.y += 50;
               thisPair.orientation = 6;
           } else if (thisPair.orientation == 6 && thisPair.block.x + thisPair.rotatable.x - 50 >= radius) {
               thisPair.rotatable.x -= 50;
               thisPair.rotatable.y -= 50;
               thisPair.orientation = 9;
           } else if (thisPair.orientation == 9) {
               thisPair.rotatable.x += 50;
               thisPair.rotatable.y -= 50;
               thisPair.orientation = 12;
           }
           console.log(thisPair.rotatable.x);
           console.log(thisPair.rotatable.y);
       }
       thisPair.rotateCCW = function rotateCCW() {
           if (thisPair.orientation == 12 && thisPair.block.x + thisPair.rotatable.x - 50 >= radius) {
               thisPair.rotatable.x -= 50;
               thisPair.rotatable.y += 50;
               thisPair.orientation = 9;
           } else if (thisPair.orientation == 9) {
               thisPair.rotatable.x += 50;
               thisPair.rotatable.y += 50;
               thisPair.orientation = 6;
           } else if (thisPair.orientation == 6 && thisPair.block.x + thisPair.rotatable.x + 50 <= width - radius) {
               thisPair.rotatable.x += 50;
               thisPair.rotatable.y -= 50;
               thisPair.orientation = 3;
           } else if (thisPair.orientation == 3) {
               thisPair.rotatable.x -= 50;
               thisPair.rotatable.y -= 50;
               thisPair.orientation = 12;
           }
           console.log(thisPair.rotatable.x);
           console.log(thisPair.rotatable.y);
       }
   }
   var space = function() { //each space keeps track of occupancy and occupant
       var thisSpace = this;
       thisSpace.occupied = false;
       thisSpace.id = spaceId;
       spaceId++;
       thisSpace.circle = null;
       thisSpace.getCircle = function getCircle() {
           return thisSpace.circle;
       }
       thisSpace.setCircle = function setCircle(newCircle) {
           thisSpace.circle = newCircle;
           thisSpace.occupied = true;
       }
       thisSpace.isOccupied = function isOccupied() {
           return thisSpace.occupied;
       }
   }

   function init() {
       startTimer();
       stage = new createjs.Stage("demoCanvas");
       var counter = 0;
       var keyBuffer = 0;
       var rotateBuffer = 0;
       gameGrid = new Array(6);
       for (var i = 0; i < 12; i++) { //this loop creates the grid
           gameGrid[i] = new Array(12);
       }
       for (var i = 0; i < 12; i++) {
           for (var j = 0; j < 6; j++) { //populates grid with spaces
               gameGrid[i][j] = new space();
           }
       }
       currentBlock = generateBlock();
       currentPair = new pair(currentBlock);
       stage.addChild(currentBlock);
       createjs.Ticker.setFPS(30)
       if (!hasBeenSet) {

           createjs.Ticker.addEventListener("tick", tick);
           hasBeenSet = true;
       }

       createjs.Ticker.addEventListener("tick", stage);

       function tick(event) {
           fallingBlock(currentBlock);
           if (keyBuffer == 0) {
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
           if (rotateBuffer == 0) {
               if ((key.isPressed('x') || key.isPressed('up')) && !hitFloor(currentBlock)) {
                   currentPair.rotateCCW();
                   console.log('x pressed');
                   rotateBuffer++;
                   stage.update();
               }
               if (key.isPressed('z') && !hitFloor(currentBlock)) {
                   currentPair.rotateCW();
                   console.log('z pressed');
                   rotateBuffer++;
                   stage.update();
               }
           }
           if (keyBuffer != 0) { //prevents keypress from registering too quickly: it's a bit clunky right now
               keyBuffer++;
               if (keyBuffer == 6) {
                   keyBuffer = 0;
               }
           }
           if (rotateBuffer != 0) {
               rotateBuffer++;
               if (rotateBuffer == 8) {
                   rotateBuffer = 0;
               }
           }
       }

       function generateBlock() { //creates a new block of two icon
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
		   //I'm only changing so I can debug easier (easier for me to read "blue" than "#00B2EE" in debugger
           /*if (x < .20) return "#F59D92"; //red
           else if (x < .40) return "#BF5FFF"; // purple
           else if (x < .60) return "#00B2EE"; // blue
           else if (x < .80) return "#6CFFD9"; // greenish
           else return "#DAF5A5"; //yellow*/
		   if (x < .20) return "blue"; //red
           else if (x < .40) return "green"; // purple
           else if (x < .60) return "purple"; // blue
           else if (x < .80) return "orange"; // greenish
           else return "pink";
       }

       function fallingBlock(block) {
           if (counter == fallInterval) {
               moveDown(block);
           }
           counter++;
       }

       function moveDown(block) {
           if (!hitFloor(block)) {
               block.y = block.y + 50;
               counter = 0;
               stage.update();
           } else {
               floor[xToArray(block.x)] -= 100;
               var x = block.x;
               var y = block.y;
               var child1x = block.getChildAt(0).x + x;
               var child1y = block.getChildAt(0).y + y;
               var child2x = block.getChildAt(1).x + x;
               var child2y = block.getChildAt(1).y + y;

               if (currentPair.orientation == 12 || currentPair.orientation == 6) {
                   gameGrid[yToArray(child1y)][xToArray(child1x)].setCircle(block.getChildAt(0));
                   block.getChildAt(0).specialY = yToArray(child1y);
                   block.getChildAt(0).specialX = xToArray(child1x);
                   gameGrid[yToArray(child2y)][xToArray(child2x)].setCircle(block.getChildAt(1));
                   block.getChildAt(1).specialY = yToArray(child2y);
                   block.getChildAt(1).specialX = xToArray(child2x);
               } else if (currentPair.orientation == 9 || currentPair.orientation == 3) {
                   if (child1y == height - radius && child2y == height - radius) {
                       gameGrid[yToArray(child1y)][xToArray(child1x)].setCircle(block.getChildAt(0));
                       block.getChildAt(0).specialY = yToArray(child1y);
                       block.getChildAt(0).specialX = xToArray(child1x);
                       gameGrid[yToArray(child2y)][xToArray(child2x)].setCircle(block.getChildAt(1));
                       block.getChildAt(1).specialY = yToArray(child2y);
                       block.getChildAt(1).specialX = xToArray(child2x);
                   } else {
                       while (!gameGrid[yToArray(child1y) + 1][xToArray(child1x)].occupied) {
                           child1y += 50;
                           block.getChildAt(0).y += 50;
                           if (child1y == height - radius)
                               break;
                       }
                       while (!gameGrid[yToArray(child2y) + 1][xToArray(child2x)].occupied) {
                           child2y += 50;
                           block.getChildAt(1).y += 50;
                           if (child2y == height - radius)
                               break;
                       }
                   }
                   gameGrid[yToArray(child1y)][xToArray(child1x)].setCircle(block.getChildAt(0));
                   block.getChildAt(0).specialY = yToArray(child1y);
                   block.getChildAt(0).specialX = xToArray(child1x);
                   gameGrid[yToArray(child2y)][xToArray(child2x)].setCircle(block.getChildAt(1));
                   block.getChildAt(1).specialY = yToArray(child2y);
                   block.getChildAt(1).specialX = xToArray(child2x);
               }

               updateGroups(block.getChildAt(0));
               updateGroups(block.getChildAt(1));
               updateBoard(0);

               currentBlock = generateBlock();
               currentPair = new pair(currentBlock);
               //speedUp(); uncomment this later
               stage.addChild(currentBlock);
           }
       }

       function moveLeft(block) {
           moveLR(block, -50);
       }

       function moveRight(block) {
           moveLR(block, 50);
       }

       function moveLR(block, deltaX) { //horizontal movement and collision detection
           var child1x = block.getChildAt(0).x + block.x;
           var child1y = block.getChildAt(0).y + block.y;
           var child2x = block.getChildAt(1).x + block.x;
           var child2y = block.getChildAt(1).y + block.y;
           if (child1y == 25) { //allows us to move the pair at the very top
               if (child1x + deltaX >= radius && child1x + deltaX <= width - radius && !gameGrid[yToArray(child1y)][xToArray(child1x + deltaX)].occupied)
                   block.x += deltaX;
           } else if (child1x + deltaX >= radius && child1x + deltaX <= width - radius && child2x + deltaX >= radius && child2x + deltaX <= width - radius) {
               if (!gameGrid[yToArray(child1y)][xToArray(child1x + deltaX)].occupied && !gameGrid[yToArray(child2y)][xToArray(child2x + deltaX)].occupied)
                   block.x += deltaX;
           }
       }

       function hitFloor(block) { //checks if  block has reached the bottom 
           var child1x = block.getChildAt(0).x + block.x;
           var child1y = block.getChildAt(0).y + block.y;
           var child2x = block.getChildAt(1).x + block.x;
           var child2y = block.getChildAt(1).y + block.y;
           if (child1y == height - radius || child2y == height - radius) {
               return true;
           } else if (gameGrid[yToArray(child1y + 50)][xToArray(child1x)].occupied || gameGrid[yToArray(child2y + 50)][xToArray(child2x)].occupied)
               return true;
           else
               return false;
       }

       function updateBoard(changed) {
           /* Iterate through all the groups in the global group list.
            * If the group size is >=4, then delete the group from the global
            * group list and the board.
            */
           var i;
           var j;
           for (i = 0; i < globalGroups.length; i++) { //for each group, check if >=4
			   if(globalGroups[i] != null){
				   if (globalGroups[i].size >= 4) {
					   changed = 1;
					   updateScore(globalGroups[i].size);
					   for (j = 0; j < globalGroups[i].elements.length; j++) { //delete every element in the group
						   var x = globalGroups[i].elements[j].specialX;
						   var y = globalGroups[i].elements[j].specialY;
						   gameGrid[y][x] = new space();
						   globalGroups[i].elements[j].parent.removeChild(globalGroups[i].elements[j]);
					   }
					   //Delete the item from the array of groups
					   globalGroups.splice(i, 1);
				   }
				   else if(globalGroups[i].size <= 0){
					//Delete from the array of groups
					   globalGroups.splice(i, 1);
				   }
			   }
		   }
           if (changed == 1) condenseColumns(); //If a group was deleted, we'll need to update the board again
       }

       function condenseColumns() {
           var x;
           for (x = 0; x <= 5; x++) { //for each column
               condenseColumn(x);
           }
           setTimeout(function() {
               updateBoard(0);
           }, 1000);
       }

       function condenseColumn(x) {
           var q;
           for (q = 11; q >= 0; q--) {
               if (!gameGrid[q][x].occupied && q > 0) { //if space is empty
                   var z = q - 1;
                   while (!gameGrid[z][x].occupied && z > 0) { //look up for the next non-empty
                       z--;
                   }
                   if (z > 0) {
                       gameGrid[z][x].circle.specialY = q;
                       gameGrid[z][x].circle.y += 2 * radius * (q - z);
                       gameGrid[q][x].setCircle(gameGrid[z][x].circle); //if you found one, swap it in
                       
					   //When a circle is moved, it might not be in its previous group anymore, so remove it
					   gameGrid[q][x].circle.group.size = gameGrid[q][x].circle.group.size - 1;
					   var index = gameGrid[q][x].circle.group.elements.indexOf(gameGrid[q][x].circle);
					   if (index > -1) {
							gameGrid[q][x].circle.group.elements.splice(index, 1);
					   }
					   gameGrid[q][x].circle.group = null;
                       updateGroups(gameGrid[q][x].circle);
                       gameGrid[z][x] = new space();
                   }
               }
           }
       }

       function updateGroups(circle) {
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
           groups = mergeGroups(groups, circle.color);
           var index;
           var foundGroup = false;
           for (index = 0; index < groups.length; index++) {
               if (groups[index].color == circle.color) {
                   circle.group = groups[index];
                   groups[index].elements[groups[index].elements.length] = circle;
                   groups[index].size = groups[index].size + 1;
                   foundGroup = true;
               }
           }
           if (!foundGroup) {
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
           //A and B are actually reversed (A is below, B is above)
           if (y + 1 <= 11) {
               if (gameGrid[y + 1][x].isOccupied()) {
                   var A = gameGrid[y + 1][x].getCircle();
                   if (A.group != null) groups[groups.length] = A.group;
               }
           }
           if (y - 1 >= 0) {
               if (gameGrid[y - 1][x].isOccupied()) {
                   var B = gameGrid[y - 1][x].getCircle();
                   if (B.group != null) {
                       if (!isInGroup(B.group.id, groups)) {
                           groups[groups.length] = B.group;
                       }
                   }
               }
           }
           if (x - 1 >= 0) {
               if (gameGrid[y][x - 1].isOccupied()) {
                   var L = gameGrid[y][x - 1].getCircle();
                   if (L.group != null) {
                       if (!isInGroup(L.group.id, groups)) {
                           groups[groups.length] = L.group;
                       }
                   }
               }
           }
           if (x + 1 <= 5) {
               if (gameGrid[y][x + 1].isOccupied()) {
                   var R = gameGrid[y][x + 1].getCircle();
                   if (R.group != null) {
                       if (!isInGroup(R.group.id, groups)) {
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
           for (index = 0; index < groups.length; index++) {
               if (groups[index].id == Id) return true;
           }
           return false;
       }

       function mergeGroups(groups, color) {
           /* Go through all adjacent groups and merge the ones with the same color.
            *
            */
           var i;
           var j;
           for (i = 0; i < groups.length; i++) {
               for (j = i + 1; j < groups.length; j++) {
                   if (groups[i].color == groups[j].color && groups[i].color == color) {
                       mergeTwo(groups[i], groups[j]); //The merged group goes in i
                       groups.splice(j, 1); //Delete j since it was merged with i
                       j--; //Decrement j since we've just deleted the jth position from the array
                   }
               }
           }
           return groups;
       }

       function mergeTwo(group1, group2) {
           //Precondition: group1 and group2 must have same color. Don't merge groups of different colors.
           var color = group1.color;
           var size = group1.size + group2.size;
           var mergedEls = [];

           var i;
           for (i = 0; i < group1.elements.length; i++) {
               mergedEls[mergedEls.length] = group1.elements[i];
           }
           for (i = 0; i < group2.elements.length; i++) {
               group2.elements[i].group = group1;
               mergedEls[mergedEls.length] = group2.elements[i];
           }
           group1.size = size;
           group1.elements = mergedEls;
		   var j;
		   //delete group2 from globalGroups
		   for(j = 0; j<globalGroups.length; j++){
				if(group2.id == globalGroups[j].id){
					globalGroups.splice(j, 1);
				}
		   }
       }

       function group(id, color, size, elements) {
           this.id = id;
           this.color = color;
           this.size = size;
           this.elements = elements;
       }

   }

   function xToArray(coord) { //converts x-coordinate to array index
       return Math.floor(coord / (2 * radius))
   }

   function yToArray(coord) { //converts y-coordinate to array index
       return Math.floor(coord / (2 * radius))
   }

   function arrayToY(y) { //converts array index to y-coordinate
       return y * 2 * radius;
   }

   function speedUp() {
       console.log(numberOfBlocksUsed);
       if (numberOfBlocksUsed % 4 == 0 && fallInterval > 5) { //speed increases every 4th block
           fallInterval = fallInterval - 5;
       }
       if (numberOfBlocksUsed % 50 == 0 && fallInterval > 3) { // 50th block reaches max speed
           fallInterval = fallInterval - 1;
       }
       console.log(fallInterval);

   }

   function updateScore(sizeOfBlock) {
       //blocks of 4 earn 7 points.
       // if the block is more than 4 then it's the difference between squares.
       // since the bigger the block size is, the more points you earn.
       if (sizeOfBlock == 4) {
           currentScore = currentScore + 7;
       } else {
           currentScore = currentScore + (sizeOfBlock * sizeOfBlock) - (16);
       }
       document.getElementById("currentScore").innerHTML = currentScore;
       if (currentScore > highScore) {
           highScore = currentScore;
           document.getElementById("highScore").innerHTML = highScore;
       }

   }

   function startTimer() {
       timer = setInterval(function() {
           document.getElementById("time").innerHTML = currentTime;
           currentTime++;
       }, 1000);
   }

   function resetGame() {
       clearInterval(timer);
       currentTime = 0;
       currentScore = 0
       document.getElementById("time").innerHTML = currentTime;
       document.getElementById("currentScore").innerHTML = currentScore;
       fallInterval = 40; //interval (in ticks) at which the block falls
       numberOfBlocksUsed = 0;
       globalGroups = [];
       globalCounter = 0;
       currentScore = 0;
       highScore = 0;
       spaceId = 0; //to id each space
       currentTime = 0;
       init();
   }
   
   function warning(){
   	alert('Two Player is still under development. Please Use One Player.')
   }
   
window.addEventListener("keydown", function(e){
    if(e.keyCode == 80) {
        e.preventDefault();
   	createjs.Ticker.setPaused(true);
    }
});
