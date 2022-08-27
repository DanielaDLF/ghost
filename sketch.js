var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  invisibleBlockGroup = new Group()
  doorsGroup = new Group()
  climbersGroup = new Group()
  ghost = createSprite(200, 200, 50, 50)
  ghost.scale = 0.5
  ghost.addImage(ghostImg)
}

function draw() {

  background(200);
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 3
    }
    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 3
    }
    if (keyDown("SPACE")) {
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.8
    spawnDoors()
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy()
      gameState = "end"
    }
    drawSprites()
    
  }
  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)
  }


  
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, 50)
    climber = createSprite(200, 110)
    invisibleBlock = createSprite(200, 115)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    door.addImage(doorImg)
    climber.addImage(climberImg)
    door.x = Math.round(random(120, 400))
    climber.x = door.x
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
    door.velocityY = 1
    climber.velocityY = 1
    door.lifetime = 800
    ghost.depth = door.depth
    ghost.depth += 1
    climber.lifetime = 800
    doorsGroup.add(door)
    invisibleBlock.debug = true


    invisibleBlockGroup.add(invisibleBlock)
    climbersGroup.add(climber)
  }
}