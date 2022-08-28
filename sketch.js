var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var score = 0
var gameover, gameoverImage
var restart, restartImage
var PLAY = 1 
var END = 0
var gameState = PLAY
var jumpSound, dieSound

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

restartImage = loadImage("assets/restart.png")
gameoverImage = loadImage("assets/gameOver.png")
jumpSound = loadSound("assets/jump.mp3")
dieSound = loadSound("assets/die.mp3")

}

function setup(){

  createCanvas(windowWidth,windowHeight);
//background image
bg = createSprite(500,480);
bg.addImage(bgImg);
bg.scale = 2.3


//creating top and bottom grounds
bottomGround = createSprite(20,height-10,width*2,10);
bottomGround.visible = true;

topGround = createSprite(20,10,width*2,10);
topGround.visible = true;
      
//creating balloon     
balloon = createSprite(100,height-100);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group(); 
barGroup = new Group();

gameover = createSprite(width/2-50,height/2-100)
gameover.addImage(gameoverImage);
gameover.scale = 0.5;
gameover.visible = false;

restart = createSprite(width/2-10,height/2-20)
restart.addImage(restartImage);
restart.scale = 0.5;
restart.visible = false;




}

function draw() {
  
  background("black");
        
          //making the hot air balloon jump
          if(gameState==PLAY){
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            //jumpSound.play()
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
           spawnObstaclesTop();
           spawnObstaclesBottom();

           
          Bar();
          if(topObstaclesGroup.isTouching(balloon)|| balloon.isTouching(topGround)|| bottomObstaclesGroup.isTouching(balloon)|| balloon.isTouching(bottomGround)){
            gameState = END
            //dieSound.play()
          }
        
        }
        if(gameState==END){
          gameover.visible = true
          restart.visible = true 

          balloon.velocityX = 0
          balloon.velocityY = 0

          topObstaclesGroup.setVelocityXEach(0)
          bottomObstaclesGroup.setVelocityXEach(0)

          barGroup.setVelocityXEach(0)

          balloon.y = height-300;

          topObstaclesGroup.setLifetimeEach(-1)
          bottomObstaclesGroup.setLifetimeEach(-1)

          if(mousePressedOver(restart)){
            reset();
          }
        }
   
        drawSprites();

        Score();
       
        //spawning top obstacles
      

      
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  score = 0;
  topObstaclesGroup.destroyEach()
  bottomObstaclesGroup.destroyEach()





}

function Score(){
  if(balloon.isTouching(barGroup)) {
    score=score+ 1
 }
 textFont("algerrian")
 textSize(30)
 fill("black")
 text("Score: "+score,100,50)





}

function spawnObstaclesTop() 
{

      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(width+100,100,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 1000;
    
   balloon.depth = balloon.depth + 1;
   topObstaclesGroup.add(obstacleTop);
   
      }
    }
    
      function spawnObstaclesBottom() {
      
            if(World.frameCount % 60 === 0) {
              obstacleBottom = createSprite(width+100,height-70);
          
          //obstacleTop.addImage(obsTop1);
          
          obstacleBottom.scale = 0.1;
          obstacleBottom.velocityX = -4;
      
          //random y positions for top obstacles
          obstacleBottom.y = Math.round(random(10,100));
      
          //generate random top obstacles
          var rand = Math.round(random(1,2));
          switch(rand) {
            case 1: obstacleBottom.addImage(obsBottom1);
                    break;
            case 2: obstacleBottom.addImage(obsBottom2);
                    break;
            case 3: obstacleBottom.addImage(obsBottom3);
                    break;  
            default: break;
          }
      
           //assign lifetime to the variable
         obstacleBottom.lifetime = 100;
          
         balloon.depth = balloon.depth + 1;
         bottomObstaclesGroup.add(obstacleBottom);
         
            }

          } 
        
          
      


 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(width+100,height/2,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
          barGroup.add(bar); 
         }
}

