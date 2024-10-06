let img;
let ripples = [];
let firstRun = true;

function setup() {
  createCanvas(1000, 1000);
  background(0);

  for (let i = 0; i < 10; i++) {
    ripples.push({
      radius: random(50, 150),
      alpha: random(100, 200),
      speed: random(2, 6),
    });
  }
}

function draw_one_frame(vocal, drum, bass, other, counter) {
  let drumSize = map(drum, 0, 255, 50, 900);
  let bassSize = map(bass, 0, 255, 50, 700);
  let otherSize = map(other, 0, 255, 50, 500);
  let vocalSize = map(vocal, 0, 255, 0, 10);

  let rotationSpeed = map(drum, 0, 255, 0, TWO_PI / 1);
  let bgRed = map(drum, 100, 0, 0, 255);
  background(bgRed, 0, 0);

  if (firstRun) {
    img = loadImage('blurry colours .jpg');
    firstRun = false;
  }
  if (img) {
    tint(255, 100);
    console.log(img);
    image(img, -10, -10, 700, 1000);
  }

  strokeWeight(100);
  translate(width / 2, height / 3);

  // Vocals
  stroke(0, 255, 0, 50); 
  ellipse(0, 0, vocalSize * 1.5, vocalSize * 1.5);

  // Drums
  stroke(20, 200, 0, 150); 
  ellipse(0, 0, drumSize, drumSize);

  // Bass
  stroke(255, 0, 0, 150); 
  ellipse(0, 0, bassSize * 1.6, bassSize * 1.6);

  // Other
  stroke(255, 255, 0, 150); 
  ellipse(0, 0, otherSize, otherSize);

  stroke(0, 255, 255, 200); 
  let vocalPulse = vocalSize + sin(counter * 10) * 80;
  ellipse(0, 0, vocalPulse, vocalPulse);

  stroke(0, 255, 255, 50);  // trailing
  ellipse(0, 0, vocalPulse * 1.2, vocalPulse * 1.2);

  // Ripple effect
  drawRipples(bass);

}

function drawRipples(bass) {
  blendMode(ADD); 

  noFill();
  for (let i = 0; i < ripples.length; i++) {
    let ripple = ripples[i];

    stroke(255, 255 - ripple.alpha, ripple.alpha, ripple.alpha * map(bass, 0, 255, 100, 1));

    ellipse(0, 0, ripple.radius * map(bass, 0, 255, 0.5, 2), ripple.radius * map(bass, 0, 255, 0.5, 2));

    ripple.radius += ripple.speed;
    ripple.alpha -= ripple.speed * 0.8;

    if (ripple.alpha < 0) {
      ripple.radius = random(50, 150);
      ripple.alpha = random(100, 200);
      ripple.speed = random(2, 6);
    }
  }

  blendMode(BLEND);  // Return to normal blend mode for other elements
}
