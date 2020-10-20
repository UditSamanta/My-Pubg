
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var man, target;
var manImage
var edges;
var gameState = null;
var bulletGroup = [];
var target1, target2;
var targetCount = 0;

function preload()
{
	manImage = loadImage("Player.png");
}

function setup() {
	createCanvas(displayWidth, displayHeight-150);	
  
  edges = createEdgeSprites();
   man = new Player(700, 648);
   man.body.addImage("player", manImage);
   man.body.scale = 0.2;
	 target = new Target(699, 236);
}


function draw() {
  rectMode(CENTER);
  background(0);

man.body.x = mouseX;

text(mouseX+" "+mouseY, 100, 100);
if(keyDown("space") && bulletGroup.length === 0)  {
  shootBullet();
}

//level 1 destroying target and calling level 2
 for(var i = 0; i < bulletGroup.length; i++) {

 
// if(bulletGroup[i].isTouching(target.body)) {
//   target.body.destroy();
//   gameState = "levelTwo";
//   levelTwo();
// } 
 }

 //destroying bullets
 for(var i = 0; i < bulletGroup.length; i++) {
  if(bulletGroup[i].y<0 ) {
    bulletGroup[i].destroy();
    bulletGroup.pop(bulletGroup[i])
    
  }
}

 
 if(gameState==="levelTwo") {

target1.bounceOff(edges);
  target2.bounceOff(edges);

 }

 if(gameState==="levelThree") {
   levelThree();
 }

  drawSprites();
 
}

function shootBullet() {
  var bullet = createSprite(500, 700, 20, 50);
  bullet.x = man.body.x;
  bullet.velocityY = -5;
bullet.lifetime = 500;

bulletGroup.push(bullet);
}

function levelTwo() {
   target1 = createSprite(370, 167, 15, 50);
  target1.velocityX = -3;
   target2 = createSprite(1028, 167, 15, 50);
  target2.velocityX = 3;

   //level 2 destroying target and calling level 3
 for(var i = 0; i < bulletGroup.length; i++) {

 
  if(bulletGroup[i].isTouching(target1.body)) {
    target1.body.destroy();
       targetCount = targetCount + 1;
  } 
  if(bulletGroup[i].isTouching(target2.body)) {
    target2.body.destroy();
   
       targetCount = targetCount + 1;
  } 
  if(targetCount>= 2) {
    levelThree();
    targetCount = 0;
    gameState = "levelThree";
  }
   }

}

function levelThree() {
  target1 = createSprite(370, 167, 15, 50);
  target1.velocityX = -3;
  target1.shapeColor = "red";
   target2 = createSprite(1028, 167, 15, 50);
  target2.velocityX = 3;
  target1.shapeColor = "yellow";
}
