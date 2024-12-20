### Collision Detection System

## 1. `const isBallInPaddleZone = state.ballY > canvas.height - 30 - state.ballSize;`

- This checks if the ball is vertically positioned in the area where the paddle exists
- `canvas.height` is the total height of the game area (400px)
- `-30` is because the paddle is positioned 20px from the bottom (considering paddle height of 10px)
- `-state.ballSize` accounts for the ball's radius so collision is detected when the ball touches the paddle, not just its center
- So if the canvas height is 400px, and ball size is 10px:
  - Paddle zone starts at: 400 - 30 - 10 = 360px from top
  - Any ball position > 360px is in the "paddle zone"

2. `const isBallAlignedWithPaddle = state.ballX > state.paddleX && state.ballX < state.paddleX + state.paddleWidth;`
   - This checks if the ball is horizontally aligned with the paddle
   - `state.ballX > state.paddleX`: Is the ball's position further right than the paddle's left edge?
   - `state.ballX < state.paddleX + state.paddleWidth`: Is the ball's position less than the paddle's right edge?
   - For example, if:
     - Paddle is at x=200 with width=80
     - Ball must be between x=200 and x=280 to be "aligned"

Here's a visual representation:

```
           Ball (x, y)
              ○
              |
              |
   Paddle Zone|
--------------+------------
   [    Paddle    ]

Bottom of Canvas
```

## When both conditions are true:

- Ball is in vertical range of paddle (isBallInPaddleZone)
- Ball is within horizontal bounds of paddle (isBallAlignedWithPaddle)
  Then we know the ball has hit the paddle and should bounce.
