"use client";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

let x = 200;
const y = 300;
let angle = 0.0;
let jitter = 0.0;

const P5Component = () => {
  const setup = (p5: p5Types) => {
    p5.noStroke();
    p5.createCanvas(1000, 800);
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
    let c1 = p5.color(255, 204, 0);
    p5.fill(c1);
    p5.square(300, 100, 400);
    p5.pop();
  };

  function touchMoved() {
    if (x >= 500) {
      x = 200;
    } else {
      x = x + 5;
    }
  }
  return <Sketch setup={setup} draw={draw} />;
};

export default P5Component;
