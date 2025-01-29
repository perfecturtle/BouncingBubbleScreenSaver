const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
})
let increment = 0;
let rotationAngle;

const waveStart = {
	y: 50,
	length: 0.003,
	amplitude: 81,
	frequency: 0.098
}
const waveEnd = {
	y: 50,
	length: 0.0003,
	amplitude: 24,
	frequency: 0.016
}



// gui.add(waveEnd, 'y', -canvas.height, canvas.height / 2);
// gui.add(waveEnd, 'length', -0.02, 0.02);
// gui.add(waveEnd, 'amplitude', 0, 300);
// gui.add(waveEnd, 'frequency', -0.01, 0.1);

const totalCycles = 4;
const transitionDuration = totalCycles * 2 * Math.PI;

function init(){
	rotationAngle = Math.atan(canvas.height / canvas.width);
	increment = waveEnd.frequency;
}
function interpolateValue(start, end, progress) {
	return start + (end - start) * progress;
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.beginPath();

	const progress = Math.min(-increment / transitionDuration, 1);

	const currentY = interpolateValue(waveStart.y, waveEnd.y, progress);
	const currentLength = interpolateValue(waveStart.length, waveEnd.length, progress);
	const currentAmplitude = interpolateValue(waveStart.amplitude, waveEnd.amplitude, progress);
	const currentFrequency = interpolateValue(waveStart.frequency, waveEnd.frequency, progress);

	for (let i = -Math.floor(canvas.width * 0.1); i < canvas.width / Math.cos(rotationAngle); i++) {
		const x = i;
		const waveShape = currentY + Math.sin(i * currentLength + increment) * currentAmplitude;
		const rotatedX = x * Math.cos(rotationAngle) - waveShape * Math.sin(rotationAngle);
		const rotatedY = x * Math.sin(rotationAngle) + waveShape * Math.cos(rotationAngle);
		c.lineTo(rotatedX, rotatedY);
	}
	increment -= currentFrequency;
	if (-increment > 100 *2 * Math.PI){
		increment = -transitionDuration ;
	}
	c.stroke();
	c.lineTo(canvas.width, canvas.height);
	c.lineTo(0, canvas.height);
	c.strokeStyle = "orange";
	c.fillStyle = 'orange';
	c.fill();
	c.stroke();
}

init();
animate();