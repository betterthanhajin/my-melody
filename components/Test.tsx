"use client";
import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

let x = 50;
const y = 50;
let vid: p5Types.MediaElement | p5Types.Element;
let theta = 0;

const Test: React.FC = () => {
  // See annotations in JS for more information
  if (typeof window !== "undefined") {
    const setup = (p5: p5Types) => {
      p5.createCanvas(100, 400, p5.WEBGL);
      p5.circle(x, y, 100);
      vid = p5.createVideo(["/assets/attention.mp4"]);
      vid.elt.muted = true;
      if (vid instanceof p5Types.MediaElement) {
        vid.loop();
      }
      vid.hide();
    };

    const draw = (p5: p5Types) => {
      p5.background(250);
      p5.translate(-220, 0, 0);
      p5.push();
      p5.rotateZ(theta * p5.mouseX * 0.001);
      p5.rotateX(theta * p5.mouseX * 0.001);
      p5.rotateY(theta * p5.mouseX * 0.001);
      //pass image as texture
      if (vid instanceof p5Types.MediaElement) {
        p5.texture(vid);
        p5.sphere(150);
      }
      p5.pop();
      p5.background(0);
      p5.ellipse(x, y, 70, 70);
      x++;
    };

    return <Sketch setup={setup} draw={draw} />;
  }
  return <></>;
};

export default Test;
