import pygame

class Controls:

    #STATIC variables, I just read about static vars in python, and comming from a Java OO background, python feels good
    snakesControls = [[ord('w'),ord('d'),ord('s'),ord('a')],[pygame.K_UP,pygame.K_RIGHT,pygame.K_DOWN,pygame.K_LEFT]] #Asciis of arrows

    snakeBody=[]

    @staticmethod
    def associateButtonToPlayer(key):
        for i, e in enumerate(data):
            try:
                return i, e.index(key)
            except ValueError:
                return 0 #Default user when a non-controlling key is pressed
