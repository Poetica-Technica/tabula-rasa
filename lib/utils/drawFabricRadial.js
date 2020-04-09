// NOT FOR PRODUCTION - Early test of Fabric.js incorporation 

const chance = require('chance').Chance();
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');
// const out = fs.createWriteStream(path.resolve(__dirname, '../../public/helloworld.jpg'));
const fabric = require('fabric').fabric;

module.exports = async(poegram, format) => {

  let canvasWidth = 512;
  let canvasHeight = 256;

  if(format === 'tweet') {
    canvasWidth = 1024;
    canvasHeight = 512;
  }

  const canvas = createCanvas(canvasWidth, canvasHeight);
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
  ctx.fillStyle = poegram.colors[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // happening async?
  loadImage('https://source.unsplash.com/random/512x256').then((image) => {
    console.log('fetching unsplash image');
    ctx.drawImage(image, 0, 0, 20, 20); 
  });
  
  // x1, y1, r1, x2, y2, r2
  // var gradient = ctx.createRadialGradient(0, 0, canvas.height, 0, 0, 0);
  var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  // const gradColor = poegram.colors[0].toString();
  gradient.addColorStop(0, poegram.colors[1]);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px serif';
  ctx.fillStyle = 'white';
  ctx.fillText(poegram.poemId.lines, 25, 100, 450);

  ctx.font = '18px sans-serif';
  ctx.fillText(`—${poegram.poemId.author} from ${poegram.poemId.title}`, 25, 180, 450);

  // Output JPG via stream (?) - flakey at best
  // const stream = canvas.createJPEGStream();
  // stream.on('data', function(chunk) {
  //   fs.createWriteStream(path.resolve(__dirname, `../../public/${poegram._id}.jpg`)).write(chunk);
  // });

  console.log('poegram color', poegram.colors);
  console.log('poegram color', poegram.colors[0]);
  // console.log('gradColor', gradColor);

  // Output PNG via buffer
  const buffer = canvas.toBuffer();
  return fs.writeFileSync(`./public/${poegram._id}.png`, buffer);

  // return path.resolve(__dirname, `../../public/${poegram._id}.png`);
};
