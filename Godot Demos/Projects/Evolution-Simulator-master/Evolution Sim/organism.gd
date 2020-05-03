
extends KinematicBody2D
var colshape
var points = 1
var direction
var velocity = 50

var color

var NeuralNetwork = preload("./lib/Neural Network/Brain.gd")
var neural_network

func init(s):
	randomize()
	_scale_orgranism(self)
	
	
	var sprite = get_node("organismSprite")
	color = Color(rand_range(0,255)/255,rand_range(0,255)/255,rand_range(0,255)/255)
	sprite.modulate = color
	pass

func estimate_best_velocity():
	var closest = find_closest_food()
	
	
	if(closest):
		var direction_to_closesest = Vector2(closest.global_position.x - global_position.x, closest.global_position.y - global_position.y)
		return direction_to_closesest
	else:
		return Vector2(0,0)
	

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
	
	direction = direction.normalized() * points
	var collision = move_and_collide(direction * velocity * delta )
		
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
func add_food():
	points += 0.001
func get_food():
	pass
	return points
	pass
	pass
func get_gene():
	return points
	pass
func calculate_fitness():
	return points
	pass
	
func multiplyVector2(vector, number):
	vector.x = vector.x * number
	vector.y = vector.y * number
	return vector
	pass




#Genetic Algo






#if Input.is_action_pressed('ui_right'):
#		velocity.x += 1
#	if Input.is_action_pressed('ui_left'):
#		velocity.x -= 1
#	if Input.is_action_pressed('ui_down'):
#		velocity.y += 1
#	if Input.is_action_pressed('ui_up'):
#		velocity.y -= 1
#	velocity = velocity.normalized() * points
