//Create variables here
var dog, happyDog, database, foodS, foodStock

function preload()
{
  //load images here
  dogNormal=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png"); 
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage("dog",dogNormal);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
}


function draw() {  
  background(46,139,87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("dog",dogHappy);
}
  drawSprites();
  //add styles here
  fill("blue");
  text("Food Remaining:" + foodS, 150, 450);
  text("Note: Press UP_ARROW key to feed Drago Milk", 150, 490);
}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {

if (x<=0) {
  x=0;
} else {
  x=x-1;
}

  database.ref('/').update({
    Food:x
  })
}

function showError() {
  console.log("error in writing to database");
}