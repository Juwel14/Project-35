var dog, happyDog, database, foodS, foodStock;

function preload()
{
  dogimg = loadImage("dogImg.png");
  happyDogimg = loadImage("dogImg1.png");
}

function setup() 
{
  createCanvas(500, 500);
  
  dog = createSprite(width/2, 300, 50, 50);
  dog.addImage(dogimg);
  dog.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() 
{  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogimg);
  }

  drawSprites();

  fill(255);
  stroke(0);
  textSize(25);
  text("Food remaining : " +foodS, 110, 150);
  textSize(15);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 75, 20);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if (x <= 0)
  {
    x = 0;
  }
   else 
   {
     x = x - 1;
   }

  database.ref('/').update
  ({
     Food: x
  })
}