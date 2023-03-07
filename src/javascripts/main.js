"use strict";

function CalculateVh()
{
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('DOMContentLoaded', CalculateVh);
window.addEventListener('resize', CalculateVh);
window.addEventListener('orientationchange', CalculateVh);

class Vector
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

class Body
{
  constructor(
    index,
    radius,
    x,
    y,
    vx,
    vy,
    mass,
    colour,
    fixed)
  {
    this.index = index;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.colour = colour;
    this.colourString = "rgba(" + colour[0] + "," + colour[1] + "," + colour[2] + ", 1)";
    this.fixed = fixed;
  }
}

class System
{
  constructor(
    width,
    height
    )
  {
    this.width = width;
    this.height = height;
    this.bodies = [];
    this.iterator = undefined;
    this.g = 0.0006674;
    this.direction = undefined;
    this.info = undefined;
    this.offsetX = 0;
    this.offsetY = 0;
    this.startPos = new Vector();
    this.endPos = new Vector();
    this.scale = 1;
  }

  Start()
  {
    this.direction = checkDirection.checked;
    this.info = checkInfo.checked;
    this.bodies.length = 0;
    this.AddBodies(parseInt(schemaSelect[schemaSelect.selectedIndex].value));
    this.Draw();
  }

  AddBodies(schema)
  {
    if(schema === 1)
    {
      // BODY 1
      let b = new Body(
        1,
        10,
        (this.width/2) - 100,
        (this.height/2),
        0,
        -1,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 2
      b = new Body(
        2,
        10,
        (this.width/2) + 100,
        (this.height/2),
        0,
        1,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
    if(schema === 2)
    {
      let centreX = this.width/2;
      let centreY = this.height/2;
      let orbitRadius = 250;

      // SUN
      let b = new Body(
        1,
        30,
        centreX,
        centreY,
        0,
        0,
        100000,
        [233, 189, 21],
        true
      );
      this.bodies.push(b);

      // BODY 2
      let rad = this.DegreeToRad(120);
      let pointX = centreX + (orbitRadius * Math.cos(rad));
      let pointY = centreY + (orbitRadius * Math.sin(rad));
      b = new Body(
        2,
        10,
        centreX - orbitRadius,
        centreY,
        0,
        -3,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 3
      rad = this.DegreeToRad(240);
      pointX = centreX + (orbitRadius * Math.cos(rad));
      pointY = centreY + (orbitRadius * Math.sin(rad));
      b = new Body(
        3,
        10,
        centreX + orbitRadius,
        centreY,
        0,
        3,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
    if(schema === 3)
    {
      let centreX = this.width/2;
      let centreY = this.height/2;
      let orbitRadius = 250;

      // SUN
      let b = new Body(
        1,
        30,
        centreX,
        centreY,
        0,
        0,
        100000,
        [233, 189, 21],
        true
      );
      this.bodies.push(b);

      // BODY 2
      let rad = this.DegreeToRad(120);
      let pointX = centreX + (orbitRadius * Math.cos(rad));
      let pointY = centreY + (orbitRadius * Math.sin(rad));
      b = new Body(
        2,
        10,
        centreX - orbitRadius / 2,
        centreY,
        0,
        -2.5,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 3
      rad = this.DegreeToRad(240);
      pointX = centreX + (orbitRadius * Math.cos(rad));
      pointY = centreY + (orbitRadius * Math.sin(rad));
      b = new Body(
        3,
        5,
        centreX + orbitRadius * 1.5,
        centreY,
        0,
        5,
        500,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
    if(schema === 4)
    {
      let centreX = this.width/2;
      let centreY = this.height/2;
      let orbitRadius = 250;

      // SUN
      let b = new Body(
        1,
        30,
        centreX,
        centreY,
        0,
        0,
        100000,
        [233, 189, 21],
        true
      );
      this.bodies.push(b);

      // BODY 2
      let rad = this.DegreeToRad(120);
      let pointX = centreX + (orbitRadius * Math.cos(rad));
      let pointY = centreY + (orbitRadius * Math.sin(rad));
      b = new Body(
        2,
        10,
        centreX - orbitRadius,
        centreY,
        0,
        -5,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 3
      rad = this.DegreeToRad(240);
      pointX = centreX + (orbitRadius * Math.cos(rad));
      pointY = centreY + (orbitRadius * Math.sin(rad));
      b = new Body(
        3,
        5,
        centreX + orbitRadius/2,
        centreY,
        0,
        2.5,
        500,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
    if(schema === 5)
    {
      let centreX = this.width/2;
      let centreY = this.height/2;
      let orbitRadius1 = 200;
      let orbitRadius2 = 200;

      // SUN
      let b = new Body(
        1,
        30,
        centreX,
        centreY,
        0,
        0,
        100000,
        [233, 189, 21],
        true
      );
      this.bodies.push(b);

      // BODY 2
      let rad = this.DegreeToRad(0);
      let pointX = centreX + (orbitRadius2 * Math.cos(rad));
      let pointY = centreY + (orbitRadius2 * Math.sin(rad));
      b = new Body(
        2,
        10,
        pointX,
        pointY,
        0,
        5,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 3
      rad = this.DegreeToRad(90);
      pointX = centreX + (orbitRadius1 * Math.cos(rad));
      pointY = centreY + (orbitRadius1 * Math.sin(rad));
      b = new Body(
        3,
        10,
        pointX,
        pointY,
        -5,
        0,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 4
      rad = this.DegreeToRad(180);
      pointX = centreX + (orbitRadius2 * Math.cos(rad));
      pointY = centreY + (orbitRadius2 * Math.sin(rad));
      b = new Body(
        4,
        10,
        pointX,
        pointY,
        0,
        -5,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 5
      rad = this.DegreeToRad(270);
      pointX = centreX + (orbitRadius2 * Math.cos(rad));
      pointY = centreY + (orbitRadius2 * Math.sin(rad));
      b = new Body(
        5,
        10,
        pointX,
        pointY,
        5,
        0,
        1000,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
    if(schema === 6)
    {
      let centreX = this.width/2;
      let centreY = this.height/2;

      let orbitRadius1 = 100;
      let orbitRadius2 = 250;
      let orbitRadius3 = 550;
      let orbitRadius4 = 700;

      // SUN
      let b = new Body(
        1,
        40,
        centreX,
        centreY,
        0,
        0,
        10000000,
        [233, 189, 21],
        true
      );
      this.bodies.push(b);

      // BODY 2
      let rad = this.DegreeToRad(0);
      let pointX = centreX + (orbitRadius1 * Math.cos(rad));
      let pointY = centreY + (orbitRadius1 * Math.sin(rad));
      b = new Body(
        2,
        5,
        pointX,
        pointY,
        0,
        2.5,
        500,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 3
      rad = this.DegreeToRad(90);
      pointX = centreX + (orbitRadius2 * Math.cos(rad));
      pointY = centreY + (orbitRadius2 * Math.sin(rad));
      b = new Body(
        3,
        15,
        pointX,
        pointY,
        -7.5,
        0,
        1500,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
      
      // BODY 4
      rad = this.DegreeToRad(180);
      pointX = centreX + (orbitRadius3 * Math.cos(rad));
      pointY = centreY + (orbitRadius3 * Math.sin(rad));
      b = new Body(
        4,
        2.5,
        pointX,
        pointY,
        0,
        -15,
        250,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 5
      rad = this.DegreeToRad(270);
      pointX = centreX + (orbitRadius4 * Math.cos(rad));
      pointY = centreY + (orbitRadius4 * Math.sin(rad));
      b = new Body(
        5,
        10,
        pointX,
        pointY,
        7.5,
        0,
        750,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
    if(schema === 7)
    {
      let centreX = this.width/2;
      let centreY = this.height/2;

      let orbitRadius1 = 200;
      let orbitRadius2 = 400;
      let orbitRadius3 = 800;
      let orbitRadius4 = 1600;
      let orbitRadius5 = 3200;

      // SUN
      let b = new Body(
        1,
        30,
        centreX,
        centreY,
        0,
        0,
        10000000,
        [233, 189, 21],
        true
      );
      this.bodies.push(b);

      // BODY 2
      let rad = this.DegreeToRad(0);
      let pointX = centreX + (orbitRadius1 * Math.cos(rad));
      let pointY = centreY + (orbitRadius1 * Math.sin(rad));
      b = new Body(
        2,
        5,
        pointX,
        pointY,
        0,
        2.5,
        100,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 3
      rad = this.DegreeToRad(0);
      pointX = centreX + (orbitRadius2 * Math.cos(rad));
      pointY = centreY + (orbitRadius2 * Math.sin(rad));
      b = new Body(
        3,
        5,
        pointX,
        pointY,
        0,
        5,
        100,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
      
      // BODY 4
      rad = this.DegreeToRad(0);
      pointX = centreX + (orbitRadius3 * Math.cos(rad));
      pointY = centreY + (orbitRadius3 * Math.sin(rad));
      b = new Body(
        4,
        5,
        pointX,
        pointY,
        0,
        7.5,
        100,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 5
      rad = this.DegreeToRad(0);
      pointX = centreX + (orbitRadius4 * Math.cos(rad));
      pointY = centreY + (orbitRadius4 * Math.sin(rad));
      b = new Body(
        5,
        5,
        pointX,
        pointY,
        0,
        10,
        100,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);

      // BODY 6
      rad = this.DegreeToRad(0);
      pointX = centreX + (orbitRadius5 * Math.cos(rad));
      pointY = centreY + (orbitRadius5 * Math.sin(rad));
      b = new Body(
        5,
        5,
        pointX,
        pointY,
        0,
        12.5,
        100,
        [233, 189, 21],
        false
      );
      this.bodies.push(b);
    }
  }

  DegreeToRad(degrees)
  {
    return degrees * ( Math.PI / 180 );
  }

  Toggle()
  {
    if(this.iterator === null || this.iterator === undefined)
    {
      this.Iterate();
    }
    else
    {
      this.Pause();
    }
  }

  Iterate()
  {
    clearInterval(this.iterator);
    this.iterator = setInterval(() => {
      this.Update();
    }, 16);
  }

  Pause()
  {
    clearInterval(this.iterator);
    this.iterator = null;
  }

  Update()
  {
    this.Gravity();
    this.Collisions();
    this.Move();
    this.Draw();
  }

  Gravity()
  {
    let len = this.bodies.length;
    for(let i = 0; i < len; i++)
    {
      let body1 = this.bodies[i];
      if(body1.fixed) continue;
      for(let g = 0; g < len; g++)
      {
        if(g === i) continue;
        let body2 = this.bodies[g];
        let vCollision = {x: body2.x - body1.x, y: body2.y - body1.y};
        let distance = Math.sqrt( ( body2.x - body1.x ) * ( body2.x - body1.x ) + ( body2.y - body1.y ) * ( body2.y - body1.y ) );
        let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
        let force = this.g * ( (body1.mass * body2.mass) / (distance * distance) );
        if(force > 0.1) force = 0.1;
        body1.vx += force * vCollisionNorm.x;
        body1.vy += force * vCollisionNorm.y;
      }
    }
  }

  Collisions()
  {
    let obj1, obj2;
    let len = this.bodies.length;
    for(let i = 0; i < len; i++)
    {
      obj1 = this.bodies[i];
      if(obj1.fixed) continue;
      for(let j = 0; j < this.bodies.length; j++)
      {
        if(j == i) continue;
        obj2 = this.bodies[j];
        if(this.CircleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius))
        {
          let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
          let distance = Math.sqrt( ( obj2.x - obj1.x ) * ( obj2.x - obj1.x ) + ( obj2.y - obj1.y ) * ( obj2.y - obj1.y ) );
          let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
          let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
          let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
          if(speed < 0)
          {
            break;
          }
          let impulse = 2 * speed / (obj1.mass + obj2.mass);
          obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
          obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
          obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
          obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
        }
      }
    }
  }

  CircleIntersect(x1, y1, r1, x2, y2, r2)
  {
    let squareDistance = ( x1 - x2 ) * ( x1 - x2 ) + ( y1 - y2 ) * ( y1 - y2 );
    return squareDistance <= ( ( r1 + r2 ) * ( r1 + r2 ) );
  }

  Move()
  {
    let len = this.bodies.length;
    for(let i = 0; i < len; i++)
    {
      let body = this.bodies[i];
      if(body.fixed) continue;
      body.x += body.vx;
      body.y += body.vy;
    }
  }

  Draw()
  {
    c.clearRect(0, 0, this.width, this.height);
    c.stroke();
    c.fillStyle = "rgba(50, 50, 75)";
    c.fillRect(0, 0, this.width, this.height);
    let len = this.bodies.length;
    for(let i = 0; i < len; i++)
    {
      let body = this.bodies[i];
      if(c.fillStyle != body.colourString) c.fillStyle = body.colourString;
      c.beginPath();
      c.arc(((body.x + this.offsetX) * this.scale), ((body.y + this.offsetY) * this.scale), (body.radius * this.scale), 0, (2 * Math.PI));
      c.fill();
      if(this.direction)
      {
        c.strokeStyle = body.colourString;
        c.beginPath();
        let newx = ((body.vx * 10) * this.scale);
        let newy = ((body.vy * 10) * this.scale);
        c.moveTo(((body.x + this.offsetX) * this.scale), ((body.y + this.offsetY) * this.scale));
        c.lineTo(((body.x + newx + this.offsetX) * this.scale), ((body.y + newy + this.offsetY) * this.scale));
        c.stroke();
      }
      if(this.info)
      {
        c.fillStyle = body.colourString;
        c.fillText("body " + body.index, ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y - (30 / this.scale) + this.offsetY) * this.scale));
        c.fillText("mass: " + body.mass, ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y - (20 / this.scale) + this.offsetY) * this.scale));
        c.fillText("radius: " + body.radius, ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y - (10 / this.scale) + this.offsetY) * this.scale));
        c.fillText("x: " + body.x.toFixed(4), ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y + this.offsetY) * this.scale));
        c.fillText("y: " + body.y.toFixed(4), ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y + (10 / this.scale) + this.offsetY) * this.scale));
        let vxText = body.vx.toFixed(4);
        if(body.fixed) vxText = "fixed";
        c.fillText("vx: " + vxText, ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y + (20 / this.scale) + this.offsetY) * this.scale));
        let vyText = body.vy.toFixed(4);
        if(body.fixed) vyText = "fixed";
        c.fillText("vy: " + vyText, ((body.x + body.radius + 5 + this.offsetX) * this.scale), ((body.y + (30 / this.scale) + this.offsetY) * this.scale));
      }
    }
  }

  Drag()
  {
    let changeX = this.endPos.x - this.startPos.x;
    let changeY = this.endPos.y - this.startPos.y;

    this.offsetX += (changeX / this.scale);
    this.offsetY += (changeY / this.scale);
  }

  ResetView()
  {
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 1;
  }
}

const startButton = document.getElementById("startButton");
const playPauseButton = document.getElementById("playPauseButton");
const viewButton = document.getElementById("viewButton");
const resetButton = document.getElementById("resetButton");
const nextButton = document.getElementById("nextButton");
const optionsButton = document.getElementById("optionsButton");
const settingsMenu = document.getElementById("settingsMenu");
const generateButton = document.getElementById("generateButton");
const gameContainer = document.getElementById("gameContainer");
const gameDiv = document.getElementById("gameDiv");
const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d");

const schemaSelect = document.getElementById("schemaSelect");
const checkDirection = document.getElementById("checkDirection");
const checkInfo = document.getElementById("checkInfo");

startButton.onclick = function(){ if(system !== null) system.Toggle(); };
viewButton.onclick = function(){ if(system !== null) system.ResetView() };
resetButton.onclick = function(){ Main() };
optionsButton.onclick = function(){ Settings() };
generateButton.onclick = function(){ Main(); };
checkDirection.onchange = function(){
  if(system !== null) system.direction = checkDirection.checked;
};
checkInfo.onchange = function(){
  if(system !== null) system.info = checkInfo.checked;
};
nextButton.onclick = function(){
  system.Pause();
  system.Update();
};

let system = null;
let toggleS = false;
let dragging = false;

function Main()
{
  ReSize();
  let w = parseInt(gameCanvas.width);
  let h = parseInt(gameCanvas.height);
  if(system !== null) system.Pause();
  system = new System(w, h);
  system.Start();
  settingsMenu.style.display = "none";
}

function Settings()
{
  if(settingsMenu.style.display === "") settingsMenu.style.display = "none";
  else settingsMenu.style.display = "";
}

function ReSize()
{
  gameContainer.width = window.innerWidth * 0.9;
  gameContainer.height = (window.innerHeight * 0.9) * 0.9;
  gameDiv.width = window.innerWidth * 0.9;
  gameDiv.height = (window.innerHeight * 0.9) * 0.9;
  gameCanvas.width = window.innerWidth * 0.9;
  gameCanvas.height = (window.innerHeight * 0.9) * 0.9;
  c.width = window.innerWidth * 0.9;
  c.height = (window.innerHeight * 0.9) * 0.9;
  if(system != null)
  {
    system.width = gameContainer.scrollWidth;
    system.height = gameContainer.scrollHeight;
    system.Draw();
  }
}

document.onkeydown = function(event)
{
  if(event.key === 'u') system.Update();
  if(event.key === 'p') system.Pause();
  if(event.key === 'i') system.Iterate();

  if(event.key === '=' || event.key === '+')
  {
    if(system.scale > 0.05)
    {
      system.scale -= 0.05;
      system.scale = Math.round(system.scale * 100) / 100;
    }
  }

  if(event.key === '-' || event.key === '_')
  {
    if(system.scale < 10)
    {
      system.scale += 0.05;
      system.scale = Math.round(system.scale * 100) / 100;
    }
  }
}

document.onwheel = function(event)
{
  if(event.deltaY > 0)
  {
    if(system.scale > 0)
    {
      system.scale -= 0.05;
      system.scale = Math.round(system.scale * 100) / 100;
      system.offsetX += (55 / system.scale);
      system.offsetY += (45 / system.scale);
    }
  }
  if(event.deltaY < 0)
  {
    if(system.scale < 10)
    {
      system.scale += 0.05;
      system.scale = Math.round(system.scale * 100) / 100;
      system.offsetX -= (55 / system.scale);
      system.offsetY -= (45 / system.scale);
    }
  }
}

gameCanvas.onmousedown = function(event)
{
  event.preventDefault();
  let rect = gameCanvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  if(system !== null)
  {
    system.startPos.x = x;
    system.startPos.y = y;
    dragging = true;
  }
}

gameCanvas.onmousemove = function(event)
{
  event.preventDefault();
  if(!dragging) return;
  let rect = gameCanvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  if(system !== null)
  {
    system.endPos.x = x;
    system.endPos.y = y;
    system.Drag();
    system.startPos.x = x;
    system.startPos.y = y;
  }
}

gameCanvas.onmouseup = function(event)
{
  event.preventDefault();
  let rect = gameCanvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  if(system !== null)
  {
    system.endPos.x = x;
    system.endPos.y = y;
    system.Drag();
    dragging = false;
  }
}

window.addEventListener('resize', ReSize);
document.addEventListener("DOMContentLoaded", Main);