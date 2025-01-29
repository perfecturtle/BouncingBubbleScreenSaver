var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var mouse = {
	x: undefined,
	y: undefined
}
window.addEventListener('mousemove',
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	})


var colourArray = [
	'#ffc700',
	'#ffab00',
	'#FFE8C2'
];

var circleArray = [];
for (var i = 0; i < 100; i++) {
	var radius = Math.max(3, Math.random() * 40);
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = 2.5 * (Math.random() - 0.5);
	var dy = 2.5 * (Math.random() - 0.5);
	circleArray.push(new Circle(x, y, dx, dy, radius));

}
animate();

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];
	//creates the circle with specified params
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = 'blue';
		c.fillStyle = this.colour;
		c.fill();

	}
	//inverses the circle speed direction when it reaches the edge
	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		//moves the circle according to speed
		this.x += this.dx;
		this.y += this.dy;

		//changes the size of the circle if mouse is over the circle within the distance
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < radius + 30) {
				this.radius += 2;
			}
		} else {
			if (this.radius > radius)
				this.radius -= 1;
		}
		this.draw();
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}