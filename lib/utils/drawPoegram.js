const { registerFont, createCanvas } = require('canvas');
const fs = require('fs');

module.exports = async(poegram, format) => {

  registerFont('./lib/utils/fonts/CrimsonText-Regular.ttf', { family: 'CrimsonText' });
  registerFont('./lib/utils/fonts/CrimsonText-Italic.ttf', { family: 'CrimsonTextItalic' });
  registerFont('./lib/utils/fonts/CrimsonText-SemiBoldItalic.ttf', { family: 'CrimsonTextSemiBoldItalic' });
  registerFont('./lib/utils/fonts/CrimsonText-Bold.ttf', { family: 'CrimsonTextBold' });
  registerFont('./lib/utils/fonts/ProzaLibre-Medium.ttf', { family: 'ProzaLibreMedium' });
  registerFont('./lib/utils/fonts/ProzaLibre-Bold.ttf', { family: 'ProzaLibreBold' });
  registerFont('./lib/utils/fonts/ProzaLibre-BoldItalic.ttf', { family: 'ProzaLibreBoldItalic' });
  registerFont('./lib/utils/fonts/FiraSans-Regular.ttf', { family: 'FiraSans' });
  registerFont('./lib/utils/fonts/FiraSans-Medium.ttf', { family: 'FiraSansMedium' });

  // Default sizes
  let canvasWidth = 512;
  let canvasHeight = 256;
  let poemDefaultFontSize = 28;
  const poemFontSizeRatio = canvasWidth / poemDefaultFontSize;
  const authorFontSizeRatio = poemFontSizeRatio * 1.67;

  if(format === 'tweetimage') {
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

  ctx.strokeStyle = 'white';
  ctx.linewidth = 1;
  const margin = 10;
  ctx.strokeRect(margin, margin, canvas.width - (margin * 2), canvas.height - (margin * 2));

  let poemFontSize = canvas.width / poemFontSizeRatio;
  if(poegram.poemId.lines.length < 15) poemFontSize *= 1.4;
  else if(poegram.poemId.lines.length < 25) poemFontSize *= 1.2;
  else if(poegram.poemId.lines.length > 40) poemFontSize *= .8;
  const poemFont = poemFontSize + 'px ProzaLibreBoldItalic';
  const authorFont = (canvas.width / authorFontSizeRatio) + 'px FiraSansMedium';
  
  ctx.font = poemFont;
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 0.5;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(poegram.poemId.lines, canvas.width / 2, canvas.height / 2 * 0.90, canvas.width * 0.9);

  // ctx.shadowColor = 'rgba(0,0,0,0)';
  ctx.font = authorFont;
  ctx.fillText(poegram.poemId.author, canvas.width / 2, canvas.height * 0.75, canvas.width * 0.9);
  ctx.fillText(`\u201C${poegram.poemId.title}\u201D`, canvas.width / 2, canvas.height * 0.85, canvas.width * 0.9);


  // Output PNG via buffer
  const buffer = canvas.toBuffer();
  fs.writeFileSync(`./public/${poegram._id}-${format}.png`, buffer);

};
