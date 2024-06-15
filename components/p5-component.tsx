"use client";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import ParticleSystem from "p5";
let x = 200;
const y = 300;
let angle = 0.0;
let jitter = 0.0;

//colour
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2: p5Types.Color;
let c1: p5Types.Color, c2: p5Types.Color;
let system: ParticleSystem;
const P5Component = () => {
  const preload = (p5: p5Types) => {};

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const setup = (p5: p5Types) => {
    p5.noStroke();
    // Define colors
    b1 = p5.color(255);
    b2 = p5.color(0);
    c1 = p5.color(204, 102, 0);
    c2 = p5.color(0, 102, 153);
    p5.createCanvas(1000, 800);
    let vector = p5.createVector(p5.width / 2, 50);
    system = new ParticleSystem(vector.dot);
  };

  const draw = (p5: p5Types) => {
    p5.background(223);
    p5.ellipse(x, y, 400, 400);
    p5.fill(51, 51, 51);
    // p5.loop();
    p5.push();
    if (x >= 500) {
      x = 200;
    } else {
      x = x + 5;
    }
    // system.addParticle();
    setGradient(50, 90, 540, 80, c1, c2, Y_AXIS, p5);
    setGradient(50, 190, 540, 80, c2, c1, X_AXIS, p5);
    let color = p5.color(255, 204, 0);
    p5.fill(color);
    p5.square(300, 100, 400);
    p5.pop();
  };

  function setGradient(
    x: number,
    y: number,
    w: number,
    h: number,
    c1: p5Types.Color,
    c2: p5Types.Color,
    axis: number,
    p5: p5Types
  ) {
    p5.noFill();
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = p5.map(i, y, y + h, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = p5.map(i, x, x + w, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(i, y, i, y + h);
      }
    }
  }
  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
    />
  );
};

export default P5Component;
