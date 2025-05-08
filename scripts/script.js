const video = document.getElementById('video');
const blocks = [
  document.getElementById('block1'),
  document.getElementById('block2'),
  document.getElementById('block3'),
  document.getElementById('block4')
];
const canvases = [];
const contexts = [];
for (let i = 0; i < 4; i++) {
  const canvas = document.createElement('canvas');
  canvases.push(canvas);
  contexts.push(canvas.getContext('2d'));
}
function setupCanvas() {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  const segmentHeight = videoHeight / 4;
  canvases.forEach((canvas, index) => {
    canvas.width = videoWidth;
    canvas.height = segmentHeight;
    if (blocks[index]) {
      blocks[index].appendChild(canvas);
    } else {
      console.error(`Block element with index ${index} not found.`);
    }
  });
}
function draw() {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  const segmentHeight = videoHeight / 4;
  canvases.forEach((canvas, index) => {
    const ctx = contexts[index];
    const sourceY = index * segmentHeight; 
    if (ctx) {
      ctx.drawImage(
        video,
        0,
        sourceY,        
        videoWidth,     
        segmentHeight,  
        0,              
        0,              
        canvas.width,   
        canvas.height   
      );
    }
  });
  requestAnimationFrame(draw);
}
video.addEventListener('loadeddata', () => {
  if (video.videoWidth > 0 && video.videoHeight > 0) {
    setupCanvas();
    draw();
  } else {
    video.addEventListener('canplay', () => {
      setupCanvas();
      draw();
    });
  }
});
video.addEventListener('error', (e) => {
    console.error('Error loading video:', e);
});