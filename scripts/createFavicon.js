const fs = require('fs');
const { createCanvas } = require('canvas');

const canvas = createCanvas(64, 64);
const ctx = canvas.getContext('2d');

// Draw a simple icon
ctx.fillStyle = '#4CAF50';
ctx.fillRect(0, 0, 64, 64);
ctx.fillStyle = 'white';
ctx.font = 'bold 32px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('OM', 32, 32);

// Save as favicon.ico
const buffer = canvas.toBuffer('image/x-icon');
fs.writeFileSync('public/favicon.ico', buffer); 