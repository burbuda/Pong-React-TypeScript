import { Paddle, Ball } from './interfaces';
import {
    grid,
    paddleHeight,
    ballSpeed,
} from './variables';

export const getLeftPaddle = (canvas: HTMLCanvasElement) => {
    return {
        x: grid * 2,
        y: canvas.height / 2 - paddleHeight / 2,
        width: grid,
        height: paddleHeight * 2,
        dy: 0
    }
}

export const getRightPaddle = (canvas: HTMLCanvasElement) => {
    return {
        x: canvas.width - grid * 3,
        y: canvas.height / 2 - paddleHeight / 2,
        width: grid,
        height: paddleHeight * 2,
        dy: 0
    }
}

export const getBall = (canvas: HTMLCanvasElement) => {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: grid,
        height: grid,
        resetting: false,
        dx: ballSpeed,
        dy: -ballSpeed
    }
}

export const collides = (obj1: Ball, obj2: Paddle) => {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
}