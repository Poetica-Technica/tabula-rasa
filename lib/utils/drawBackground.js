const { createCanvas } = require('canvas');
const fs = require('fs');

module.exports = async(poegram, format) => {

  let canvasWidth = 512;
  let canvasHeight = 256;

  if(format === 'tweet') {
    canvasWidth = 1024;
    canvasHeight = 512;
  }

  const canvas = createCanvas(canvasWidth, canvasHeight);

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = poegram.colors[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, poegram.colors[1]);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px serif';
  ctx.fillStyle = 'white';
  ctx.fillText(poegram.poemId.lines, 25, 100, 450);

  ctx.font = '18px sans-serif';
  ctx.fillText(`—${poegram.poemId.author} from ${poegram.poemId.title}`, 25, 180, 450);

  // Output PNG via buffer
  const buffer = canvas.toBuffer();
  return fs.writeFileSync(`./public/${poegram._id}.png`, buffer);

};
