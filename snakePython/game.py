import pygame, sys, random, time
from Snake import Snake
from Controls import Controls;

# check for initializing errors
check_errors = pygame.init()
if check_errors[1] > 0:
    print("(!) Had {0} initializing errors, exiting...".format(check_errors[1]))
    sys.exit(-1)
else:
    print("(+) PyGame successfully initialized!")

# Play surface
frameWidth = 720
frameHeight = 460
playSurface = pygame.display.set_mode((frameWidth, frameHeight))
pygame.display.set_caption('Lets skake!')

# Colors
red = pygame.Color(255, 0, 0) # gameover
green = pygame.Color(0, 255, 0) #snake
black = pygame.Color(0, 0, 0) #score
white = pygame.Color(255, 255, 255) #background
brown = pygame.Color(165, 42, 42) #food

# FPS controller
fpsController = pygame.time.Clock()

#Instantiating players
numberOfPlayers = 2

#TODO:BEAUTIFY
snake1 = Snake(100,100,100,100,90,100,80,100)
snake2 = Snake(100,300,100,300,90,300,80,300)
snakes = [snake1,snake2]


foodPos = [random.randrange(1,frameWidth/10)*10,random.randrange(1,frameHeight/10)*10]
foodSpawn = True

# Game over function
def gameOver():
    myFont = pygame.font.SysFont('monaco', 72)
    GOsurf = myFont.render('Game over!', True, red)
    GOrect = GOsurf.get_rect()
    GOrect.midtop = (360, 15)
    playSurface.blit(GOsurf,GOrect)
    showScore(0)
    pygame.display.flip()

    time.sleep(4)
    pygame.quit() #pygame exit
    sys.exit() #console exit

def showScore(choice=1):
    for snake in snakes:
        sFont = pygame.font.SysFont('monaco', 24)
        Ssurf = sFont.render('Score : {0}'.format(snake.score) , True, black)
        Srect = Ssurf.get_rect()

    if choice == 1:
        Srect.midtop = (80, 10)
    else:
        Srect.midtop = (360, 120)
    playSurface.blit(Ssurf,Srect)


# Main Logic of the game
while True:
    for event in pygame.event.get():

        playerIndex = 0
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            playerIndex = Controls.associateButtonToPlayer(event.key)
            if event.key == Snakes.snakesControls[playerIndex][1]: #Right
                snakes[playerIndex].changeto = 'RIGHT'
            if event.key == Snakes.snakesControls[playerIndex][3]: #K_LEFT
                snakes[playerIndex].changeto = 'LEFT'
            if event.key == Snakes.snakesControls[playerIndex][0]: #K_UP
                snakes[playerIndex].changeto = 'UP'
            if event.key == Snakes.snakesControls[playerIndex][2]: #K_DOWN
                snakes[playerIndex].changeto = 'DOWN'
            if event.key == pygame.K_ESCAPE: #K_ESCAPE
                snakes[playerIndex].pygame.event.post(pygame.event.Event(pygame.QUIT))

    # validation of direction
    if snakes[playerIndex].changeto == 'RIGHT' and not snakes[playerIndex].direction == 'LEFT':
        snakes[playerIndex].direction = 'RIGHT'
    if snakes[playerIndex].changeto == 'LEFT' and not snakes[playerIndex].direction == 'RIGHT':
        snakes[playerIndex].direction = 'LEFT'
    if snakes[playerIndex].changeto == 'UP' and not snakes[playerIndex].direction == 'DOWN':
        snakes[playerIndex].direction = 'UP'
    if snakes[playerIndex].changeto == 'DOWN' and not snakes[playerIndex].direction == 'UP':
        snakes[playerIndex].direction = 'DOWN'

    # Update snake position [x,y]
    if snakes[playerIndex].direction == 'RIGHT':
        snakes[playerIndex].snakePos[0] += 10
    if snakes[playerIndex].direction == 'LEFT':
        snakes[playerIndex].snakePos[0] -= 10
    if snakes[playerIndex].direction == 'UP':
        snakes[playerIndex].snakePos[1] -= 10
    if snakes[playerIndex].direction == 'DOWN':
        snakes[playerIndex].snakePos[1] += 10


    # Snake body mechanism
    for snake in snakes:
        snake.snakeBody.insert(0, list(snake.snakePos))
        if snake.snakePos[0] == foodPos[0] and snake.snakePos[1] == foodPos[1]:
            snake.score += 1
            foodSpawn = False
        else:
            snake.snakeBody.pop()

    #Food Spawn
    if foodSpawn == False:
        foodPos = [random.randrange(1,72)*10,random.randrange(1,46)*10]
    foodSpawn = True

    #Background
    playSurface.fill(white)

    #Draw Snake
    for snake in snakes:
        for pos in snake.snakeBody:
            pygame.draw.rect(playSurface, green, pygame.Rect(pos[0],pos[1],10,10))

    #Draw Food
    pygame.draw.rect(playSurface, brown, pygame.Rect(foodPos[0],foodPos[1],10,10))


    for snake in snakes:
        #Bound
        if snake.snakePos[0] > 710 or snake.snakePos[0] < 0:
            gameOver()
        if snake.snakePos[1] > 450 or snake.snakePos[1] < 0:
            gameOver()
        # Self hit
        for block in snake.snakeBody[1:]:
            if snake.snakePos[0] == block[0] and snake.snakePos[1] == block[1]:
                gameOver()

    #common stuff
    showScore()
    pygame.display.flip()

    fpsController.tick(24)
