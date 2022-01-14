var path,car,cash, pathImg,carImg,cashImg,sound;
var cashCollection = 0;
var cashGroup,bombGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  carImg = loadImage("car(player).png")
  bombImg = loadImage("bomb(obstacle).png")
  cashImg = loadImage("cash.png");
  endImg =loadAnimation("gameOver.png");
  sound  = loadSound("sound(pos).wav")
}

function setup(){
  
createCanvas(windowWidth,windowHeight);

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


car = createSprite(width/2,height-20,20,20);
car.addAnimation("car(player).png",carImg);
car.scale=0.5;
  
cashGroup=new Group();
bombGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  car.x = World.mouseX;
  
  edges= createEdgeSprites();
  car.collide(edges);
  


   if(path.y > height ){
     path.y = height/2;
  }
  
    createCash();
    createbomb();

    if (cashGroup.isTouching(car)) {
      cashGroup.destroyEach();
      cashCollection=cashCollection + 10;
      //playSound("sound(pos).wav")
      sound.play()
    }
    
      
    else{
      if(bombGroup.isTouching(car)) {
        gameState=END;
        
        car.addAnimation("car(player).png",endImg);
        car.x=width/2;
        car.y=height/2;
        car.scale=0.6;
        car.velocityY = 0;
        
        cashGroup.destroyEach();
        bombGroup.destroyEach();
        
        cashGroup.setVelocityYEach(0);
        bombGroup.setVelocityYEach(0);
        path.velocityY=0
     
    }
  }
}
  drawSprites();
  textSize(20);
  fill(255);
  text("cash: "+ cashCollection,width-150,30);
  }



function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashGroup.add(cash);
  }
}


function createbomb(){
  if (World.frameCount % 100 == 0) {
  var bomb = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.1;
  bomb.velocityY = 4;
  bomb.lifetime = 200;
  bombGroup.add(bomb);
  }
}