"use client";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

let x = 200;
const y = 200;
let angle = 0.0;
let jitter = 0.0;

const P5Component = () => {
  const setup = (p5: p5Types) => {
    p5.noStroke();
    p5.createCanvas(1000, 800);
  };

  const draw = (p5: p5Types) => {
    p5.background(223);
    jitter = p5.random(-0.1, 0.1);
    angle = angle + jitter;
    let c = p5.cos(angle);
    const circle = p5.ellipse(x, y, 300, 300).fill(51, 51, 51);
    circle.rotate(180);
    // p5.loop();
    if (x >= 500) {
      x = 200;
    } else {
      x = x + 5;
    }
  };
  return <Sketch setup={setup} draw={draw} />;
};

export default P5Component;
