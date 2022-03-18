var gameState = "play";

var boy, boy_climbing, boy_collided;

var branchGroup, branch;
var treeImg;
var score = 0;
var collidedSound;

var gameOver, restart;

var score = 0;

function preload() {
  collidedSound = loadSound("assets/sounds/loseSound.mp3");

  treeImg = loadImage("assets/images/tree.png");

  boy_climbing = loadAnimation(
    "assets/images/climbing1.png",
    "assets/images/climbing2.png"
  );
  boy_collided = loadImage("assets/images/loseImage.jpg");

  branchImg = loadImage("assets/images/branch.png");
}

function setup() {
  createCanvas(600, 600);

  tree = createSprite(300, 300);
  tree.addImage("tree", treeImg);
  tree.velocityY = 2;

  boy = createSprite(50, height - 70, 20, 50);
  boy.addAnimation("climbing", boy_climbing);
  boy.setCollider("rectangle", 0, 50, 270, 400);
  boy.scale = 0.2;
  boy.debug = false;

  branchGroup = createGroup();
}

function draw() {
  background(200);
  fill("white");

  if (gameState == "play") {
    if (tree.y > 400) {
      tree.y = 300;
    }
    if (keyDown("right_Arrow") || keyDown("d")) {
      boy.x = boy.x + 5;
    }
    if (keyDown("left_Arrow") || keyDown("a")) {
      boy.x = boy.x - 5;
    }

    if (boy.isTouching(branchGroup)) {
      gameState = "over";
    }

    spawnBranches();

    drawSprites();
  } else if (gameState == "over") {
    background(0);
    text("Game Over", 300, 300);
    text("Score: " + score, 50, 300);
  }
}

function spawnBranches() {
  if (frameCount % 240 === 30) {
    score += 1;
    branch = createSprite(Math.random() * 500, -30);
    branch.addImage("branch", branchImg);
    branch.velocityY = 2;
    branch.debug = false;
    branch.lifetime = 700;
    branchGroup.add(branch);
    branch.scale = 0.2;
    boy.depth = branch.depth + 1;
  }
}
