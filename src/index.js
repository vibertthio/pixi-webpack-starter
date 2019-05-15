import * as PIXI from 'pixi.js';

import './index.scss';
import venusImg from './assets/venus_1000.jpg';
import * as dat from 'dat.gui';

// variables
let loading = true;
let texture;
let sprite;
let spriteDisplayRatio;

// gui
const gui = new dat.GUI();

// setup app
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xbeeef7,
  transparent: false,
});
document.body.appendChild(app.view);

// check WebGL support
console.log(PIXI.utils.isWebGLSupported());
console.log(PIXI.RENDERER_TYPE);
console.log(app.renderer.type);

// load
app.loader
  .add(venusImg)
  .load(setup);

function setup(loader, resources) {
  // texture
  const venusTexture = resources[venusImg].texture;
  const { baseTexture, frame } = venusTexture;
  const texturePixelRatio = frame.height / frame.width;
  const orig = frame;
  const trim = frame;
  const anchor = new PIXI.Point(0, 0);
  const rotatedTexture = new PIXI.Texture(baseTexture, frame, orig, trim, 0, anchor);
  const venusSprite = new PIXI.Sprite(rotatedTexture);
  venusSprite.anchor.set(0.5);

  app.stage.addChild(venusSprite);
  sprite = venusSprite;
  texture = rotatedTexture;
  spriteDisplayRatio = texture.frame.width / texture.frame.height;
  loading = false;
}

// animation
app.ticker.add(() => {

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = width / height;

  if (!loading) {
    // fullscreen
    sprite.x = window.innerWidth * 0.5;
    sprite.y = window.innerHeight * 0.5;
    sprite.scale.set(
      (ratio > spriteDisplayRatio) ?
      (width / texture.frame.width) :
      (height / texture.frame.height)
    );
  }
});

// resize
window.onresize = function (e) {
  var w = window.innerWidth;
  const h = window.innerHeight;
  app.renderer.resize(w, h);
};
