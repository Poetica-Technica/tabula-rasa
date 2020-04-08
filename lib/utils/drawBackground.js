const chance = require('chance').Chance();
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');
// const out = fs.createWriteStream(path.resolve(__dirname, '../../public/helloworld.jpg'));
const fabric = require('fabric').fabric;

module.exports = async(poegram) => {

  console.log('drawing background');
  console.log('poegram is', poegram);
  console.log('poegram.poemId.lines is', poegram.poemId.lines);

  const canvas = createCanvas(512, 256);
  // const canvas = new fabric.StaticCanvas(null, { width: 512, height: 256 });
  const text = new fabric.Text('Hello world', {
    left: 250,
    top: 100,
    fill: '#fff'
  });

  const radialGradientRect = new fabric.Rect({
    left: 0,
    top: 0,
    width: canvas.width,
    height: canvas.height
  });

  radialGradientRect.setGradient('fill', {
    type: 'radial',
    r1: canvas.width,
    r2: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    colorStops: {
      0: chance.color({ format: 'hex' }),
      1: 'transparent'
    }
  });

  const topLeftRadialGradient = new fabric.Rect({ left: 0, top: 0, width: canvas.width, height: canvas.height });
  const topRightRadialGradient = new fabric.Rect({ left: 0, top: 0, width: canvas.width, height: canvas.height });
  const bottomLeftRadialGradient = new fabric.Rect({ left: 0, top: 0, width: canvas.width, height: canvas.height });
  const bottomRightRadialGradient = new fabric.Rect({ left: 0, top: 0, width: canvas.width, height: canvas.height });

  topLeftRadialGradient.setGradient('fill', {
    type: 'radial',
    r1: canvas.width, r2: 0,
    x1: 0, y1: 0, 
    x2: 0, y2: 0,
    colorStops: {
      0: chance.color({ format: 'hex' }),
      1: 'transparent'
    }
  });

  topRightRadialGradient.setGradient('fill', {
    type: 'radial',
    r1: canvas.width, r2: 0,
    x1: 0, y1: 0, 
    x2: canvas.width, y2: 0,
    colorStops: {
      0: chance.color({ format: 'hex' }),
      1: 'transparent'
    }
  });

  bottomLeftRadialGradient.setGradient('fill', {
    type: 'radial',
    r1: canvas.width, r2: 0,
    x1: 0, y1: canvas.height, 
    x2: 0, y2: 0,
    colorStops: {
      0: chance.color({ format: 'hex' }),
      1: 'transparent'
    }
  });

  bottomRightRadialGradient.setGradient('fill', {
    type: 'radial',
    r1: canvas.width, r2: 0,
    x1: 0, y1: 0, 
    x2: 0, y2: canvas.height,
    colorStops: {
      0: chance.color({ format: 'hex' }),
      1: 'transparent'
    }
  });

  
  // canvas.backgroundColor = chance.color({ format: 'hex' });
  // canvas.add(background);
  // canvas.add(radialGradientRect);
  // canvas.add(topLeftRadialGradient);
  // canvas.add(topRightRadialGradient);
  // canvas.add(bottomLeftRadialGradient);
  // canvas.add(bottomRightRadialGradient);
  // canvas.add(text);

  // const myImg = loadImage('https://source.unsplash.com/random/512x256');
  // myImg.then(() => {
  // canvas.add(myImg);
  // }).catch(err => {
  //   console.log('oh no!', err);
  // });

  // canvas.renderAll();

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText(poegram.poemId.lines, 25, 100, 450);

  // Output JPG via stream (?) - flakey at best
  const stream = canvas.createJPEGStream();
  stream.on('data', function(chunk) {
    fs.createWriteStream(path.resolve(__dirname, '../../public/test.jpg')).write(chunk);
  });

  // Output PNG via buffer
  const buffer = canvas.toBuffer();
  fs.writeFileSync('./public/test.png', buffer);

  return path.resolve(__dirname, '../../public/test.jpg');
};
