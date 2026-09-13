import * as PIXI from "pixi.js";
import {
  doAnimate,
  colors,
  shapeTypes,
  blendModes,
  maxLineStrength,
  maxLoop,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  MAX_OVERDRAWS,
} from "./config.js";

export const canvas = document.getElementById("canvas");

canvas.getContext("webgl", {
  preserveDrawingBuffer: true,
});

const container = new PIXI.Container();
let activeItems = [];

const app = new PIXI.Application(CANVAS_WIDTH, CANVAS_HEIGHT, {
  antialias: true,
  view: canvas,
  backgroundColor: colors[randomRange(0, colors.length)],
});

app.stage.addChild(container);
document.body.appendChild(app.view);

// Start the global animation loop ticker
app.ticker.add((delta) => {
  if (doAnimate) {
    for (let i = 0; i < activeItems.length; i++) {
      const item = activeItems[i];
      // item.spinSpeed was assigned during creation
      item.rotation += item.spinSpeed * delta;
    }
  }
});

//*******************************************************************************************

export function createPattern() {
  app.renderer.backgroundColor = colors[randomRange(0, colors.length)];

  activeItems.forEach((item) => item.destroy());
  activeItems = [];
  container.removeChildren();

  const maxLoopDuration = randomRange(1, MAX_OVERDRAWS);

  for (let i = 0; i < maxLoopDuration; i++) {
    const config = {};
    initShape(config);
    drawLoop(config);
  }
}

function initShape(config) {
  config.posX = randomRange(5, 10);
  config.posY = randomRange(5, 10);
  config.sizeW = randomRange(10, 20);
  config.sizeH = randomRange(10, 20);
  config.distanceX = config.sizeW * 3;
  config.distanceY = config.sizeH * 2;

  config.type = shapeTypes[randomRange(0, shapeTypes.length)];
  config.lineStrength = randomRange(0, maxLineStrength);
  config.fillColor = colors[randomRange(0, colors.length)];
  config.blendMode =
    PIXI.BLEND_MODES[blendModes[randomRange(1, blendModes.length)]];
}

function drawLoop(config) {
  for (let y = 0; y <= maxLoop; y++) {
    for (let x = 0; x <= maxLoop; x++) {
      const item = new PIXI.Graphics();

      item.beginFill(config.fillColor, 1);
      item.lineStyle(
        config.lineStrength,
        colors[randomRange(0, colors.length)],
      );

      item["draw" + config.type](
        -config.sizeW / 2,
        -config.sizeH / 2,
        config.sizeW,
        config.sizeH,
        config.sizeW,
      );
      item.endFill();

      item.blendMode = config.blendMode;

      item.x = config.posX + x * config.distanceX;
      item.y = config.posY + y * config.distanceY;

      item.rotation = Math.random() * Math.PI * 2;

      item.spinSpeed = (Math.random() - 0.5) * 0.05;

      container.addChild(item);
      activeItems.push(item);
    }
  }
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - 1 - min + 1) + min);
}
