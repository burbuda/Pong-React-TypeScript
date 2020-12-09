import React, {
  useRef,
  useEffect,
} from 'react';

import {
  grid,
  paddleHeight,
  paddleSpeed,
  ballColor
} from './variables';

import {
  getBall,
  getLeftPaddle,
  getRightPaddle,
  collides
} from './functions';

import {Paddle, Ball} from './interfaces';


import classes from './styles.module.css';

let canvas: HTMLCanvasElement;
let ctx: any;


const Canvas = () => {
  let canvasRef = useRef < HTMLCanvasElement > (null);
  let leftPaddle:Paddle;
  let rightPaddle:Paddle;
  let ball:Ball;
  let LeftmaxPaddleY:number;
  let RightmaxPaddleY:number;

  useEffect(() => {
    if (canvasRef.current) {
      canvas = canvasRef.current;
      ctx = canvas.getContext('2d');
    };

    leftPaddle = getLeftPaddle(canvas);
    rightPaddle = getRightPaddle(canvas);
    ball = getBall(canvas);

    LeftmaxPaddleY = canvas.height - grid - paddleHeight * 2;
    RightmaxPaddleY = canvas.height - grid - paddleHeight*2;

    window.addEventListener('keydown', (e) => {
      if (e.which === 38) {
        rightPaddle.dy = -paddleSpeed;
      }
      else if (e.which === 40) {
        rightPaddle.dy = paddleSpeed;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.which === 38 || e.which === 40) {
        rightPaddle.dy = 0;
      }
    });
    loop();
  }, []);

  const loop = () => {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
    if (leftPaddle.y < grid) {
      leftPaddle.y = grid;
    }
    else if (leftPaddle.y > LeftmaxPaddleY) {
      leftPaddle.y = LeftmaxPaddleY;
    }
    if (rightPaddle.y < grid) {
      rightPaddle.y = grid;
    }
    else if (rightPaddle.y > RightmaxPaddleY) {
      rightPaddle.y = RightmaxPaddleY;
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    ball.x += ball.dx;
    ball.y += ball.dy;
    leftPaddle.dy = ball.dy;
    if (ball.y < grid) {
      ball.y = grid;
      ball.dy *= -1;
    }
    else if (ball.y + grid > canvas.height - grid) {
      ball.y = canvas.height - grid * 2;
      ball.dy *= -1;
    }
    if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
      ball.resetting = true;
      setTimeout(() => {
        ball.resetting = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 1000);
    };
    if (collides(ball, leftPaddle)) {
      ball.dx *= -1;
      ball.x = leftPaddle.x + leftPaddle.width;
    } else if (collides(ball, rightPaddle)) {
      ball.dx *= -1;
      ball.x = rightPaddle.x - ball.width;
    };
    ctx.fillStyle = ballColor;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    ctx.fillRect(0, 0, canvas.width, grid);
    ctx.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
    for (let i = grid; i < canvas.height - grid; i += grid * 2) {
      ctx.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
    };
  }

  return <canvas ref = {canvasRef} width = "1000" height = "600" className = {classes.Canvas} />
};

export default Canvas;