function drawBackground() {

  const chance = require('chance').Chance();
  const { loadImage } = require('canvas');

  const fs = require('fs');
  const out = fs.createWriteStream(__dirname + '/helloworld.png');

  const fabric = require('fabric').fabric;

  const canvas = new fabric.StaticCanvas(null, { width: 512, height: 256 });
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

  
  canvas.backgroundColor = chance.color({ format: 'hex' });
  // canvas.add(background);
  // canvas.add(radialGradientRect);
  // canvas.add(topLeftRadialGradient);
  // canvas.add(topRightRadialGradient);
  // canvas.add(bottomLeftRadialGradient);
  canvas.add(bottomRightRadialGradient);
  canvas.add(text);

  // const myImg = loadImage('https://source.unsplash.com/random/512x256');
  // myImg.then(() => {
  // canvas.add(myImg);
  // }).catch(err => {
  //   console.log('oh no!', err);
  // });

  canvas.renderAll();

  var stream = canvas.createPNGStream();
  stream.on('data', function(chunk) {
    out.write(chunk);
  });

  return (out.path);
}

module.exports = drawBackground();

console.log(drawBackground());
