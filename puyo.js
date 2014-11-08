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
