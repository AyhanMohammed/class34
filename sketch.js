
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bgImg;

var banana,bananaImg;

var rope1,rope2;

var fruit_con,fruit_con_2;

var monkey,monkeyImg,monkey1,monkeyr1;

var button;



function preload(){

  bgImg = loadImage("bg.png");
  bananaImg = loadImage("banana.png");
  monkeyImg = loadImage("monkey.png");

  monkey1 = loadAnimation("monkey1.png","monkey2.png","monkey3.png");
  monkeyr1 = loadAnimation("monkeyr1.png","monkeyr2.png","monkeyr3.png");

}
function setup() {
  createCanvas(600,400);

  engine = Engine.create();
  world = engine.world;
 
  rope = new Rope(7,{x:390,y:30});
   rope2 = new Rope(5,{x:565,y:30});

   banana = Bodies.circle(270,300,20);
   Matter.Composite.add(rope2.body,banana);
 
   fruit_con = new Link(rope,banana);
   fruit_con_2 = new Link(rope2,banana);

   monkey = createSprite(width,320,20,20);
   monkey.addImage("laughing",monkeyImg);
   monkey.addAnimation("right",monkey1);
   monkey.addAnimation("left",monkeyr1);
   monkey.changeAnimation("right");
   monkey.scale = 1.5;
   monkey.velocityX = 1;

   //btn 1
  button = createImg('cut_btn.png');
  button.position(390,30);
  button.size(30,30);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(550,30);
   button2.size(30,30);
   button2.mouseClicked(drop2);
 
}


function draw() 
{
  background(51);
  image(bgImg,0,0,width,height);
  push();
  imageMode(CENTER);
  if(banana!=null){
    image(bananaImg,banana.position.x,banana.position.y,50,50);
  }
  pop();

  if (monkey.position.x >= width - 100) {
    monkey.velocityX = -10;
    monkey.changeAnimation("right");
  }

  if (monkey.position.x <= 10) {
    monkey.velocityX = 10;
    monkey.changeAnimation("left");
  }

  if(collide(banana,monkey,80)==true)
  {
    World.remove(engine.world,banana);
    banana = null;
    monkey.changeImage('laughing');
    monkey.velocityX = 0;
    monkey.scale = 0.2;
  }

  Engine.update(engine);

  rope.show();
  rope2.show();

  drawSprites();
  
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,sprited)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=sprited)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}