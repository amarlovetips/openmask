const createReactLogo = (size) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Draw a blue circle
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2.2, 0, 2 * Math.PI);
  ctx.fillStyle = '#61DAFB';
  ctx.fill();
  
  return canvas.toDataURL();
};

// Create both sizes
const logo192 = createReactLogo(192);
const logo512 = createReactLogo(512);

export { logo192, logo512 }; 