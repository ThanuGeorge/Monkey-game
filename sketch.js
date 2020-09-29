
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,invisibleground;
var score = 0;
var survivaltime = 0;
var gamestate = "p";
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(100,255,30,80);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  invisibleground = createSprite(300,295,600,10);
  invisibleground.visible = false;
  FoodGroup = new Group();
  obstacleGroup = new Group();
   
}


function draw() {
  background("lightblue");
  if(gamestate === "p") {
  invisibleground.velocityX = -3;
  if(invisibleground.x <0) {
    invisibleground.x = invisibleground.width/2;
  }
     if(keyDown("space")) {
     monkey.velocityY = -10;
     }
  monkey.velocityY = monkey.velocityY +0.4;
    if (monkey.isTouching(FoodGroup)) {
     score = score + 5;
      FoodGroup.destroyEach();
  } 
    bananafood();
  obstacles();
    survivaltime=Math.ceil(frameCount/frameRate()) 
    if (monkey.isTouching(obstacleGroup)) {
      gamestate = "e";
  }
  } else {
       obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        invisibleground.velocityX = 0;
        monkey.velocityY = 0;
    }   
 
 monkey.collide(invisibleground);
  
  drawSprites();
  textSize(20);
  fill("blue");
  text("Score: "+ score, 500,50);    
 
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivaltime, 100,50);
}

function obstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,260,50,50);
  obstacle.addImage("obstacle",obstaceImage);
  obstacle.scale=0.15;
  obstacle.velocityX = -3;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
  }
 
}
function bananafood() {
  if(frameCount % 90 === 0) {
    banana = createSprite(600,100,30,30);
  banana.addImage("bananaImage",bananaImage);
  banana.scale=0.1;
  banana.velocityX = -5;
  banana.y = Math.round(random(50,130));
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth +1;
  banana.lifetime = 120;
  FoodGroup.add(banana);
  }
}



