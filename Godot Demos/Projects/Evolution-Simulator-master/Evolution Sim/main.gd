extends Node2D
onready var organism = preload("res://organism.tscn")
onready var food = preload("res://food.tscn")
onready var organism_container = get_node("organsism_container")
onready var food_container = get_node("food_container")
onready var count_generation_label = get_node("HUD/count_generation_label")
onready var count_organism_label = get_node("HUD/count_organism_label")
onready var order_organism_label = get_node("HUD/order_organism_label")

var is_organism_moving_threshold = 0.1
var count_generation = 0
var count_organism = 0
var HUD_text = ""
# Mutation rate as a percent
const MUTATION_RATE = 10

var time_start = 0
var time_now = 0

const MIN_SIZE = 0.1
const MAX_SIZE = 1

var new_gen_organisms = null
var screensize
func _ready():
	time_start = OS.get_unix_time()
	screensize = get_viewport_rect().size
	print(screensize)
	#add_child(food_container)
	#add_child(organism_container)
	
	initial_population(5)
	count_organism = 5
	spawn_food(30)
	update_HUD()
	pass

#spawn random organisms for inital population
#num parameter specifies how many random organisms to spawn
func initial_population(num):
	randomize()
	for i in range(num):
		spawn_organism(rand_range(MIN_SIZE,MAX_SIZE))
	pass

func spawn_organism(size):
	var o = organism.instance()
	o.init(size)
	organism_container.add_child(o)
	o.set_position(Vector2(rand_range(0,screensize.x - 10), 
						   rand_range(0, screensize.y - 10)))

func spawn_food(num):	
	randomize()
	for i in range(num):
		var f = food.instance()
		food_container.add_child(f)
		f.set_position(Vector2(rand_range(0,screensize.x - 10),rand_range(0, screensize.y - 10)))
	pass
#func _process(delta):
#	# Called every frame. Delta is time since last frame.
#	# Update game logic here.
#	pass

func reproduction():
	update_HUD()
	new_gen_organisms = []
	var num_curr_organisms = organism_container.get_child_count()
	
	for i in range (num_curr_organisms):
		new_gen_organisms.append(select_organism())
	for o in organism_container.get_children():
		print("old gen gene: " + str(o.get_gene()))
	kill_curr_organisms()
	for i in new_gen_organisms:
		print("new gen gene: " + str(i))
	spawn_new_generation()
	
func update_HUD():
	update_count_generation()
	update_count_organisms()
	
func kill_curr_organisms():
	for organism in organism_container.get_children():
		organism.queue_free()

func spawn_new_generation():
	var o
	for i in new_gen_organisms:
		#if entry is null we create a random organism
		if i == null || mutation():
			o = spawn_organism(rand_range(MIN_SIZE,MAX_SIZE)) 
		else:
			o = spawn_organism(i)
		organism_container.add_child(o)
	
# Selects organisms for reproduction using roulette wheel selection
func select_organism():
	var sum_fitness =  total_fitness()
	var rand = rand_range(0,sum_fitness)
	var partial_sum = 0
	for organism in organism_container.get_children():
		partial_sum += organism.calculate_fitness()
		if(partial_sum >= rand):
			return organism.get_gene()
	return null

func total_fitness():
	var sum = 0
	for organism in organism_container.get_children():
		sum += organism.calculate_fitness()
	return sum
		
# Updates variable and HUD lable by 1
func update_count_generation():
	count_generation += 1
	count_generation_label.set_text("Generation : " + str(count_generation))

# Updates variable and HUD lable by 1
func update_count_organisms():
	count_organism_label.set_text("Organisms : " + str(count_organism))

# Randomly mutates organism 
func mutation():
	randomize()
	var rand = rand_range(0,100)
	if(rand < MUTATION_RATE):
		return true
	else:
		return false

func organisms_moving(threshold):
	for o in organism_container.get_children():
		var distance = calculate_distance(o.global_position ,o.last_checked_position)
		print(distance)
		o.last_checked_position = o.global_position
		if(distance > threshold):
			return true
	print("false")
	return false
	
func _process(delta):
		if food_container.get_child_count() == 0 or not organisms_moving(is_organism_moving_threshold):
			reproduction()
			for food in food_container.get_children():
				food.queue_free()

			spawn_food(30)
			
			
			
func calculate_distance(A,B):
	return sqrt(pow(B.x - A.x,2) + pow(B.y - A.y,2))
