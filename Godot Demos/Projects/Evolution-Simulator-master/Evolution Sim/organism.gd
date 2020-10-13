
extends KinematicBody2D
var colshape
var points = 1
var direction
var velocity = 200
var last_checked_position
var color
var evolution_rate = 0.01

var Matrix = preload("./lib/Neural Network/Matrix.gd")
var MatrixOperator = preload("./lib/Neural Network/MatrixOperator.gd")

var NeuralNetwork = preload("./lib/Neural Network/Brain.gd")
var neural_network

func init(s):
	randomize()
	_scale_orgranism(self)
	neural_network = NeuralNetwork.new(3, 4, 2)
	
	var sprite = get_node("organismSprite")
	color = Color(rand_range(0,255)/255,rand_range(0,255)/255,rand_range(0,255)/255)
	sprite.modulate = color
	pass

func estimate_best_velocity():
	var closest = find_closest_food()
	
	if(closest):
		#var direction_to_closesest = Vector2(closest.global_position.x - global_position.x, closest.global_position.y - global_position.y)

		return neural_network.predict([global_position.x, global_position.y, calculate_distance(closest.global_position, global_position)])
	else:
		return Vector2(0,0)
	
			
func calculate_distance(A,B):
	return sqrt(pow(B.x - A.x,2) + pow(B.y - A.y,2))


#Should be replaced to calculate the distance based on radius
func find_closest_food():
	var food_container = get_tree().get_root().get_node("main/food_container")
	
	var food_points = food_container.get_children()
	if food_points:
		var nearest_food_point = food_points[0]
		
		for food_point in food_points:
				if food_point.global_position.distance_to(global_position) < nearest_food_point.global_position.distance_to(global_position):
					nearest_food_point = food_point
		return nearest_food_point
	else:
		return null 
	
		
func _physics_process(delta):
	direction = estimate_best_velocity()
	direction = Vector2(direction[0],direction[1])
	var collision = move_and_collide(direction * velocity  * points * delta )
		
	if collision and is_correct_name(collision.collider.name):
		eat(collision.collider)

func is_correct_name(name):
	if "@food@" in name or name=="food":
		return true
	else:
		return false
	
func eat(food):
	points += 1;
	food.queue_free()

func _ready():
	# Called when the node is added to the scene for the first time.
	# Initialization here
	
	last_checked_position = global_position
	
	pass
	

	

func _scale_orgranism(body):
	var scale = body.get_scale()
	
	
	var sprite = body.get_child(0)
	var collision_circle = body.get_child(1)
	
	var scale_sprite = sprite.get_scale()
	var scale_collision = collision_circle.get_scale()
	
	scale_sprite = multiplyVector2(scale_sprite, points * 0.2)
	scale_collision = multiplyVector2(scale_collision, points * 0.2)
	
	sprite.set_scale(scale_sprite)
	collision_circle.set_scale(scale_collision)
	pass
	

func get_gene():
	return points
	pass
func get_fitness():
	return points
	pass
	
func multiplyVector2(vector, number):
	vector.x = vector.x * number
	vector.y = vector.y * number
	return vector
	pass


func get_organism_brain():
	return neural_network.get_parameters()

#Genetic Algo

func set_organism_brain(params):
	neural_network.set_parameters(params) #TODO: DEFINE

func get_evolution(brain_parameters):
	for layer in brain_parameters:
		var weights = layer[0]
		var biases = layer[1]
		
		var weights_evolution_map 
		var biases_evolution_map = []
		
			
		for i in range(0,weights.to_array().size()):
			if(rand_range(0,1) == 0):
				weights_evolution_map = Matrix.new(weights.rows, weights.cols, evolution_rate)
			else:
				weights_evolution_map = Matrix.new(weights.rows, weights.cols, -evolution_rate)
		
		
		for i in range(0,biases.to_array().size()):
			if(rand_range(0,1) == 0):
				biases_evolution_map = Matrix.new(biases.rows, biases.cols, evolution_rate)
			else:
				biases_evolution_map = Matrix.new(biases.rows, biases.cols, -evolution_rate)
		
		MatrixOperator.subtract(weights, weights_evolution_map)
		MatrixOperator.subtract(biases, biases_evolution_map)
		
				
	return brain_parameters
	
	


#if Input.is_action_pressed('ui_right'):
#		velocity.x += 1
#	if Input.is_action_pressed('ui_left'):
#		velocity.x -= 1
#	if Input.is_action_pressed('ui_down'):
#		velocity.y += 1
#	if Input.is_action_pressed('ui_up'):
#		velocity.y -= 1
#	velocity = velocity.normalized() * points
