document.addEventListener('DOMContentLoaded', () => {
  let eyeElements = document.querySelectorAll('.eye-pupil');
  let catElement = document.querySelector('.cat');

  let catBorder = catElement.getBoundingClientRect();
  let catCentreX = catBorder.left + catBorder.width / 2;
  let catCentreY = catBorder.top + catBorder.height / 2;

  const mouse = { x: 0, y: 0 };
  const circle = { x: catCentreX, y: catCentreY };

  addEventListener('resize', () => {
    eyeElements = document.querySelectorAll('.eye-pupil');
    catElement = document.querySelector('.cat');

    catBorder = catElement.getBoundingClientRect();
    catCentreX = catBorder.left + catBorder.width / 2;
    catCentreY = catBorder.top + catBorder.height / 2;

  })

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  const speed = 0.13;

  // Start animation
  const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    // Create a transformation string for cursor translation

    eyeTrackX = (circle.x - catCentreX) * 100 / (window.innerWidth - catCentreX);
    eyeTrackY = (circle.y - catCentreY) * 40 / (window.innerHeight - catCentreY);
    const translateTransform = `translate(${eyeTrackX}%, ${eyeTrackY}%)`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    eyeElements.forEach(eyeElement => {
      eyeElement.style.transform = `${translateTransform}`;
    });
    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
  }

  // Start the animation loop
  tick();
});
