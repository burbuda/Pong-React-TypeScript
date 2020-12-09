export interface Paddle {
    x: number,
    y: number,
    width: number,
    height: number,
    dy: number
}

export interface Ball {
    x: number,
    y: number,
    width: number,
    height: number,
    resetting: boolean,
    dx: number,
    dy: number
}