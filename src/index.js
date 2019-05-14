import * as PIXI from 'pixi.js';

import './index.scss';
import venusImg from './assets/venus_1000.jpg';
import * as dat from 'dat.gui';

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

// texture
const venusTexture = PIXI.Texture.from(venusImg);
const { baseTexture, frame } = venusTexture;
const texturePixelRatio = frame.height / frame.width;
const orig = frame;
const trim = frame;
const anchor = new PIXI.Point(0, 0);
const rotatedTexture = new PIXI.Texture(baseTexture, frame, orig, trim, 0, anchor);
const venusSprite = new PIXI.TilingSprite(rotatedTexture, window.innerWidth, window.innerHeight);
app.stage.addChild(venusSprite);
console.log(app.stage.children);

// animation
app.ticker.add(() => {
});

// resize
window.onresize = function (e) {
  var w = window.innerWidth;
  var h = window.innerHeight;
  app.renderer.resize(w, h);
};
