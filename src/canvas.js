
import * as PIXI from "pixi.js";

import { 
  colors,
  shapeTypes,
  blendModes,
  maxLineStrength,
  maxLoop
} from "./config.js"

export const canvas = document.getElementById("canvas")

canvas.getContext("webgl",  {
  preserveDrawingBuffer: true
})

const container = new PIXI.Container();
const RNDShape = new PIXI.Graphics();

const app = new PIXI.Application(
  canvas.width,
  canvas.height, {
    antialias: true,
    view: canvas,
    backgroundColor : colors[randomRange(0, colors.length)]
  }
);

app.stage.addChild(container);
document.body.appendChild(app.view);
container.addChild(RNDShape);

//*******************************************************************************************

export function createPattern() { 
  app.renderer.backgroundColor = colors[randomRange(0, colors.length)]
  RNDShape.clear()
    
  for (let i=0; i<3; i++) {
    initShape(RNDShape)
    drawLoop(RNDShape)
  }
}

function initShape(shape) {
  shape.posX = randomRange(5, 10)
  shape.posY = randomRange(5, 10)
  shape.sizeW = randomRange(10, 20)
  shape.sizeH = randomRange(10, 20)
  shape.distanceX = shape.sizeW*3
  shape.distanceY = shape.sizeH*2
  shape.type = shapeTypes[randomRange(0, shapeTypes.length)]
  shape.lineStrength = randomRange(0,maxLineStrength)
  shape.fillColor = colors[randomRange(0, colors.length)]
  shape.blendMode = PIXI.BLEND_MODES[blendModes[randomRange(1, blendModes.length)]]
}


function drawLoop(shape) {
  for (let y = 0; y <= maxLoop; y ++) {
    shape.beginFill(shape.fillColor, 1)
    for (let x = 0; x <= maxLoop; x++) {
        shape.lineStyle(shape.lineStrength, colors[randomRange(0, colors.length)]);
        draw(shape, y, x)
    }
  }
  shape.endFill()
}

function draw(shape, countY, countX) {
    shape["draw" + shape.type](
        shape.posX + countX * shape.distanceX,
        shape.posY + countY * shape.distanceY, 
        shape.sizeW,
        shape.sizeH,
        shape.sizeW
    );
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - 1 - min + 1) + min)
}