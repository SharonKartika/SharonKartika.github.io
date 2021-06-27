
class Walker {
  constructor(sw = 6,alpha = 100,nColor=2) {
    this.x = width / 2;
    this.y = height / 2;
    // this.colorad = [[255, 80, 205], [	4, 217, 255],[255,140,0]][[0,1,2][Math.floor(random(2))]];
    this.colorad = [[77,238,234],[240,0,255],[255,231,0]][Math.floor(random(nColor))];
    this.prex;
    this.prey;
    this.alpha = alpha;
    strokeWeight(sw);
    stroke(0);
    // this.scale = Math.floor(random(4))+1;  
    this.scale = 1;
    // this.scale = [1,3,6,10][Math.floor(random(4))];
  }

  step() {
    // if (frameCount > 100){
    stroke(this.colorad[0], this.colorad[1], this.colorad[2],this.alpha);
    // } 
    this.prey = this.y;
    this.prex = this.x;
    // let choiceVector = [[0, 1], [1, 0], [0, -1], [-1, 0]][Math.floor(random(4))];
    let choices = [[1, 0], [1 / 2, (3 / 4) ** (1 / 2)], [-1 / 2, 1 * (3 / 4) ** (1 / 2)],
    [-1, 0], [-1 / 2, -1 * (3 / 4) ** (1 / 2)], [1 / 2, -1 * (3 / 4) ** (1 / 2)]];
    let choiceVector = choices[Math.floor(random(6))];
    this.x += this.scale * stepLength * choiceVector[0];
    this.y += this.scale * stepLength * choiceVector[1];
    // ellipse(this.x,this.y,100,100);
  }
  show() {
    line(this.prex, this.prey, this.x, this.y);

  }

}
let walkers = [];
let nWalker;
let stepLength = 20;
let startOffset = 1; 

// let nWalkerInput;
// let stepLengthInput;
// let startOffsetInput;

function setup() {
  background(0);
  nWalker = random(10,200);
  stepLength = random(3,40);
  startOffset = random(0,200);
  // nWalkerInput = createInput('Number of Walkers');
  // stepLengthInput = createInput('Step length in pixels');
  // startOffsetInput = createInput('Number of steps before displaying');

  // nWalkerInput.changed(() => {
  //   nWalker = parseInt(nWalkerInput.value);
  //   background(0);
  // });
  // stepLengthInput.changed(() => {
  //   stepLength = parseInt(stepLengthInput.value);
  // });
  // startOffsetInput.changed(() => {
  //   startOffset = parseInt(startOffsetInput.value);
  //   background(0);
  // })


  createCanvas(windowWidth, windowHeight);
  background(0);
  let nColor = random(1,3);
  for (let i = 0; i < nWalker; i++) {
    walkers[i] = new Walker(random(5,20),random(5,150),nColor);
    for (let j = 0; j < startOffset; j++) {
      walkers[i].step();
    }
  }
}

function draw() {
  fill(175);
  
  for (let i = 0; i < nWalker; i++) {
    walkers[i].step();
    if (!mouseIsPressed){
    walkers[i].show();
    }
  }
}

// function mousePressed(){
//   setup();
// }