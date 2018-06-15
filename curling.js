jQuery(window).on('load', function() {
	var $ = jQuery;
	var ballList = [];

	class vector {
		constructor(xVal, yVal) {
			this.x = xVal;
			this.y = yVal;
		}
		get x() {
			return this._x;
		}
		get y() {
			return this._y;
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
			return this._position;
		}
		set position(input) {
			this._position = input;
		}
		get clicked() {
			return this._clicked;
		}
		set clicked(input) {
			this._clicked = input;
		}
		get ball() {
			return this._ball[0];
		}
		set ball(input) {
			this._ball = input;
		}
		constructor($el) {
			this.ball = $el;
			this.clicked = false;
			//this.id = intval(new Date());
			this.position = new vector(0, 0);
		}
	};

	//var ball1 = new CurlingBall($('.ball1'));
	var ball2 = $('.ball2');
	var ball1 = $('.ball1');

	ballList.push(new CurlingBall($('.ball1')));
	ballList[0].position.x = 100;
	ballList[0].position.y = 100;
	ballList.push(new CurlingBall($('.ball2')));
	console.log(ball1);


	// function createVec(x,
	// 	y) {
	// 	var vector = new vector();
	// 	vector.x = x;
	// 	vector.y = y;
	// 	return vector;
	// }

	//var ball;
	// var ballX = 100;
	// var ballY = 100;
	// var ballClicked = false;

	//$(window).load(function() {
	//console.log(ball1.ball[0]);
	ball1[0].addEventListener('mousedown',
		onBallMouseDown, false);
	ball1[0].addEventListener('mouseup',
		onBallMouseUp, false);
	ball1[0].addEventListener('touchstart',
		onBallMouseDown, false);
	ball1[0].addEventListener('touchend',
		onBallMouseUp, false);
	//document.body.appendChild(ball1.ball);


	document.addEventListener('mousemove',
		onMouseMove, false);
	document.addEventListener('touchmove',
		onTouchMove, false);

	//});

	function onMouseMove(e) {

		if (ballList[ind].clicked == true) {
			ballList[ind].position.x = e.pageX - 50;
			ballList[ind].position.y = e.pageY - 50;
			ballList[ind].ball.style.left = ballList[ind].position.x + "px";
			ballList[ind].ball.style.top = ballList[ind].position.y + "px";
		}

	};

	function onTouchMove(e) {

		if (ballList[ind].clicked == true) {
			ballList[ind].position.x = e.targetTouches[0].pageX - 50;
			ballList[ind].position.y = e.targetTouches[0].pageY - 50;
			ballList[ind].ball.style.left = ballList[ind].position.x + "px";
			ballList[ind].ball.style.top = ballList[ind].position.y + "px";
		}

	};
	var ind = 0;
	var startPosX;
	var startPosY;
	var startTime;
	var stopTime;
	var midX = $(window).width() / 2;
	var midY = $(window).height() / 2;


	function onBallMouseDown(e) {
		ballList[ind].clicked = true;
		startPosX = ballList[ind].position.x;
		console.log("mousedown x " + startPosX);
		startPosY = ballList[ind].position.y;
		startTime = performance.now();

	};

	function onBallMouseUp(e) {
		//console.log("ball un clicked " + this);
		ballList[ind].clicked = false;
		stopTime = performance.now();
		var dist = Math.sqrt((ballList[ind].position.x - startPosX) * (ballList[ind].position.x - startPosX) +
			(ballList[ind].position.y - startPosY) * (ballList[ind].position.y - startPosY));
		var vel = dist * 500 / ((stopTime - startTime));
		console.log("mouseup x " + ballList[ind].position.x);
		var ang = Math.atan2((ballList[ind].position.x - startPosX), (ballList[ind].position.y - startPosY)) * 180 / Math.PI;
		console.log("xdist " + (ballList[ind].position.x - midX - startPosX));
		console.log("ydist " + (ballList[ind].position.y - midY - startPosY));
		console.log(ang);
		//When the ball is released, it will be thrown at an angle relative to it's original position when it is thrown..  
		//For testing purposes, let's throw a the ball at 90 degrees with a speed of 60 pixels per second.
		throwBall(ang, vel);


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

			//ballX = ballX + vx;
			//ballY = ballY - vy;


			// ball.style.left = ballX + "px";
			// ball.style.top = ballY + "px";

			ballList[ind].position.x = ballList[ind].position.x + vx;
			ballList[ind].position.y = ballList[ind].position.y - vy;

			ballList[ind].ball.style.left = ballList[ind].position.x + "px";
			ballList[ind].ball.style.top = ballList[ind].position.y + "px";

			if (animationComplete == true) {
				clearInterval(interval);
				console.log("ball throw animation complete.");
			}

		}, 1000 / 60);

	};
});