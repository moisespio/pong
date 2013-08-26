window.requestAnimFrame = (function(){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){
		return window.setTimeout(callback, 1000 / 60);
	};
})();

(function () {
	'use strict';

	var canvas = document.getElementById('canvas'),
		stage = canvas.getContext('2d'),
		mouse = {
			x : 0,
			y : 0
		},
		bar = {
			width : 6,
			offset : 10,
			height : 120
		},
		ball = {
			radius : 5,
			x : bar.offset + bar.width + 5,
			y : 0
		},
		speed = {
			x : 4,
			y : 4
		};

	function update () {
		ball.x += speed.x;
		ball.y += speed.y;

		draw.update();
		requestAnimFrame(update);
	};

	var draw = {
		update : function () {
			draw.clear();
			draw.background();
			draw.ball();
			draw.bar();
		},
		background : function () {
			stage.fillStyle = 'black';
			stage.fillRect(0, 0, canvas.width, canvas.height);
		},
		bar : function () {
			stage.fillStyle = 'white';
			stage.fillRect(bar.offset, (mouse.y - 60), bar.width, bar.height);
			stage.fillRect(canvas.width - bar.offset - bar.width, (mouse.y - 60), bar.width, bar.height);
		},
		ball : function () {
			if ((ball.y > (canvas.height - ball.radius)) || (ball.y < 1)) {
				speed.y = speed.y * -1;
			}

			if ((ball.x > (canvas.width - ball.radius - bar.offset - bar.width)) || (ball.x < (bar.offset + bar.width + ball.radius))) {
				console.log(ball.x);
				if ((ball.y > (mouse.y - 60)) && (ball.y < (mouse.y + 60))) {
					console.log('colidiu');
				} else {
					console.log('perdeu');
				}

				speed.x *= -1;
			}

			stage.fillStyle = "cyan";
			stage.beginPath();
			stage.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
			stage.closePath();
			stage.fill();
		},
		clear : function () {
			stage.clearRect(0, 0, canvas.width, canvas.height);
		}
	}

	function move (e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	};

	$(function () {
		update();
		$('#canvas').on('mousemove', move);
	});
}());