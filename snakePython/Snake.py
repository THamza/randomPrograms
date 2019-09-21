class Snake:
    score = 0

    direction = 'RIGHT'
    changeto = direction

    def __init__(self,x,y,a1,a2,b1,b2,c1,c2):
        #Important variables
        self.snakePos = [x,y]
        self.snakeBody = [[a1,a2],[b1,b2],[c1,c2]]
