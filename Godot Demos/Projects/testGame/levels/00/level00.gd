extends Node2D

var nCreatures = 2

var first = true
var creatures = []

const DIRT_TILE = 8
const FOREST_TILE = 1

func _physics_process(delta):
	
	var scene = load("res://components/creature/Creature.tscn")
	
	
	if(first):
		for i in range(0,nCreatures):
			creatures.append(scene.instance())
			creatures[i].set_name("creature"+str(i))
			creatures[i].set_position(Vector2(rand_range(0, get_viewport().size.x), rand_range(0, get_viewport().size.y)))
			add_child(creatures[i])
		first = false
	else:
		for i in range(0,nCreatures):
			if(  get_node("lands").get_cellv(get_node("lands").world_to_map(creatures[i].get_position())) == -1  ):
				print("dead")
				creatures[i].queue_free()  #KILLS from screen make it into a screature.kill() with aniation?
				creatures.erase(creatures[i])
				nCreatures = nCreatures - 1
				continue
			print("creature ", i ,": ", " / " ,get_node("lands").world_to_map(creatures[i].get_position()) , "  /  ", get_node("lands").get_cellv(get_node("lands").world_to_map(creatures[i].get_position())))
			
