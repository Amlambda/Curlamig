jQuery(window).on('load', function() {
	var $ = jQuery;


	class vector {
		constructor(xVal, yVal) {
			this.x = xVal;
			this.y = yVal;
		}
		get x() {
			return this.x;
		}
		get y() {
			return this.y;
		}
		set x(xVal) {
			this._x = xVal;
		}
		set y(yVal) {
			this._y = yVal;
		}

	};

	class CurlingBall {
		get position() {
			return this.position;
		}
		set position(input) {
			this._position = input;
		}
		constructor($el) {
			this.ball = $el;
			//this.id = intval(new Date());
			this.position = new vector(0, 0);
		}
	};

	var ball1 = new CurlingBall($('.ball1'));
	var ball2 = new CurlingBall($('.ball2'));



	// function createVec(x,
	// 	y) {
	// 	var vector = new vector();
	// 	vector.x = x;
	// 	vector.y = y;
	// 	return vector;
	// }

	var ball;
	var ballX = 100;
	var ballY = 100;
	var ballClicked = false;

	window.on('load', function() {

		ball1.addEventListener('mousedown', function(e) {
			onBallMouseDown(e);
		}, false);
		ball1.addEventListener('mouseup', function(e) {
			onBallMouseUp(e);
		}, false);
		ball1.addEventListener('touchstart', function(e) {
			onBallMouseDown(e);
		}, false);
		ball1.addEventListener('touchend', function(e) {
			onBallMouseUp(e);
		}, false);
		document.body.appendChild(ball1);

		ball2.addEventListener('mousedown', function(e) {
			onBallMouseDown(e);
		}, false);
		ball2.addEventListener('mouseup', function(e) {
			onBallMouseUp(e);
		}, false);
		ball2.addEventListener('touchstart', function(e) {
			onBallMouseDown(e);
		}, false);
		ball2.addEventListener('touchend', function(e) {
			(e);
		}, false);
		document.body.appendChild(ball2);

		document.addEventListener('mousemove', function(e) {
			onMouseMove(e);
		}, false);
		document.addEventListener('touchmove', function(e) {
			onTouchMove(e);
		}, false);

	});

	function onMouseMove(e) {

		if (ballClicked == true) {
			ballX = e.pageX - 25;
			ballY = e.pageY - 25;
			ball.style.left = ballX + "px";
			ball.style.top = ballY + "px";
		}

	};

	function onTouchMove(e) {

		if (ballClicked == true) {
			ballX = e.targetTouches[0].pageX - 25;
			ballY = e.targetTouches[0].pageY - 25;
			ball.style.left = ballX + "px";
			ball.style.top = ballY + "px";
		}

	};

	function onBallMouseDown(e) {

		ballClicked = true;

	};

	function onBallMouseUp(e) {

		ballClicked = false;

		//When the ball is released, it will be thrown at an angle relative to it's original position when it is thrown..  
		//For testing purposes, let's throw a the ball at 90 degrees with a speed of 60 pixels per second.
		throwBall(60, 50);

	};

	function throwBall(angle, speed) {

		var animationComplete = false;

		//put the angle in radians
		var rads = angle * Math.PI / 180;

		//calculate the x and y components of the velocity in pixels per frame
		//speed is in pixels per second, so divide by 60 to get pixels per frame
		var vx = Math.cos(rads) * speed / 60;
		var vy = Math.sin(rads) * speed / 60;

		var interval = setInterval(function() {

			//How do I Calculate the new X and Y position for the ball during each frame, based on the angle and speed which it was thrown?

			ballX = ballX + vx;
			ballY = ballY - vy;

			ball.style.left = ballX + "px";
			ball.style.top = ballY + "px";

			if (animationComplete == true) {
				clearInterval(interval);
				console.log("ball throw animation complete.");
			}

		}, 1000 / 60);

	};
});