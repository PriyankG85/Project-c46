var bg, bgImg;
var bottomGround, topGround;
var balloon, balloonImg;
var jumpSound, dieSound;
var bottomObs1Img, bottomObs2Img, bottomObs3Img;
var topObs1Img, birdObsAnim;
var gameOverImg, restartImg;
var ObstaclesGroup;
var lives = 5;
var gameState = 1;

function preload() {
  // Images
  bgImg = loadImage("assets/bg.png");
  bottomObs1Img = loadImage("assets/obsBottom1.png");
  bottomObs2Img = loadImage("assets/obsBottom2.png");
  bottomObs3Img = loadImage("assets/obsBottom3.png");
  topObs1Img = loadImage("assets/obsTop1.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");

  // Sounds
  jumpSound = loadSound("assets/jump.mp3");
  dieSound = loadSound("assets/die.mp3");

  // Animations
  balloonImg = loadAnimation(
    "assets/balloon1.png",
    "assets/balloon2.png",
    "assets/balloon3.png"
  );
  birdObsAnim = loadAnimation("assets/obsTop2.png", "assets/obsTop3.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  //Background image
  // bg = createSprite(width / 2, height / 2, 1, 1);
  // bg.addImage(bgImg);
  // // bg.velocityX = -4;
  // bg.scale = 1.3;

  //Creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //Creating balloon
  balloon = createSprite(100, 100, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.33;

  ObstaclesGroup = new Group();
}

function draw() {
  background(bgImg);
  textSize(34);
  noStroke();
  fill(66);
  text("Lives: ", 100, 60);
  fill(0);
  text("" + lives, 200, 60);

  if (frameCount <= 150) {
    textSize(28);
    fill(60);
    text(
      "Press 'space' or 'Up Arrow' key to jump the hot air balloon!",
      340,
      60
    );
  }

  // if (bg.x < width / 2 - 80) {
  //   bg.x = width / 2 + 90;
  // }

  //Adding gravity
  balloon.velocityY += 2.6;

  drawSprites();

  if (gameState == 1) {
    bottomObstacles();
    topObstacles1();
    topObstacles2();
  }

  if (ObstaclesGroup.isTouching(balloon) && lives != 0) {
    lives--;
    ObstaclesGroup.destroyEach();
  } else if (lives == 0) {
    over = createSprite(width / 2, height / 2 - 20);
    over.addImage(gameOverImg);
    over.scale = 1.2;
    balloon.destroy();
    gameState = 0;
  }
}

function keyPressed() {
  // Making the hot air balloon to jump
  if (keyCode === UP_ARROW || keyCode === 32) {
    balloon.velocityY = -30;
    jumpSound.play();
  }
}

function bottomObstacles() {
  if (frameCount % 200 == 0) {
    var botObsImg = random([
      bottomObs1Img,
      bottomObs2Img,
      bottomObs3Img,
      bottomObs2Img,
    ]);
    var botObs = createSprite(width + 20, height / 2 + 160, 50, 100);
    botObs.velocityX = -4;
    botObs.scale = 0.25;
    botObs.lifetime = 360;
    botObs.addImage(botObsImg);
    ObstaclesGroup.add(botObs);
  }
}
function topObstacles1() {
  if (frameCount % 280 == 0) {
    var topObs = createSprite(
      width + 20,
      random([120, 180, 280, 180, 180, 280]),
      50,
      100
    );
    topObs.velocityX = -3;
    topObs.scale = 0.22;
    topObs.addImage(topObs1Img);
    topObs.lifetime = 500;
    ObstaclesGroup.add(topObs);
  }
}
function topObstacles2() {
  if (frameCount % 320 == 0) {
    var birdObs = createSprite(
      width + 20,
      random([200, 280, 330, 300, 280, 200]),
      50,
      50
    );
    birdObs.velocityX = -5;
    birdObs.scale = 0.14;
    birdObs.addAnimation("birdObs", birdObsAnim);
    birdObs.lifetime = 320;
    ObstaclesGroup.add(birdObs);
  }
}
