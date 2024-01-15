let stars = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvasWrapper");
  cnv.touchMoved(makeStar);
  
}
function makeStar(){
  if(random()<0.4){
    stars.push(new Star(mouseX, mouseY));

  }
}
function makeStars(){
  for(let i = 0; i < 5; i++){
    makeStar();
  }
}

function draw() {
  background(255);
  if(mouseX != pmouseX || mouseY != pmouseY){
    makeStar();
  }
  
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
  }
  // noLoop();
  for(let i = stars.length -1; i >= 0; i--){
    if(stars[i].scaleFactor <= 0){
      stars.splice(i, 1);
    }
  }
  
  // console.log(stars.length)
}


class Star{
  constructor(startx, starty){
    this.x =startx;
    
    this.y = starty;
    this.s = 6;
    this.numCrossGridUnits = 8;
    this.speed = random(1.2, 1.5);
    
    this.noiseValue = random(1000);
    this.xOffset = noise(this.noiseValue);
    this.noiseStep = 0.01;
    this.noiseMult = 0;
    
    this.scaleFactor = 1;
    this.scaleSpeed = 0.007;
  }
  update(){
    this.y+= this.speed;
    this.xOffset+= noise(this.noiseValue)-0.5;
    this.noiseValue + this.noiseStep;
    this.noiseMult++;
    
    this.scaleFactor-= this.scaleSpeed;
    if(this.scaleFactor <0){
      this.scaleFactor = 0;
      
    }
  }
  display(){
    push();
    
    translate(this.x+this.xOffset, this.y);
    scale(this.scaleFactor)
    noStroke();
    fill(0);
    rect(-this.s/this.numCrossGridUnits/2,-this.s/2, this.s/this.numCrossGridUnits, this.s)
    rect(-this.s/2, -this.s/this.numCrossGridUnits/2, this.s, this.s/this.numCrossGridUnits)
    // rect(-this.s/20, -this.s/2, this.s/5, this.s);
    // rect(-this.s/2,-this.s/20, this.s, this.s/5);
    
    // noFill();
    // stroke("red");
    // rect(-this.s/2, -this.s/2, this.s, this.s)
    
    
    
    
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  makeStars();
}
