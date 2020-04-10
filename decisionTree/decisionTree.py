
from random import randrange
from csv import reader
import pandas as pd 

# Convert string column to float
def floatify(dataset, column):
	for row in dataset: 
		if(not isNumber(row[column])): #If we don't check, an exception will be thrown. (the same mechanism is used in order to implement the isNumber())
			continue
		row[column] = float(row[column].strip())
 
# Split a dataset into k folds
def getSplits(dataset, kFolds):
	splitedDataset = list()
	datasetCopy = list(dataset)
	foldSize = int(len(dataset) / kFolds)
	for i in range(kFolds):
		fold = list()
		while len(fold) < foldSize:
			index = randrange(len(datasetCopy))
			fold.append(datasetCopy.pop(index))
		splitedDataset.append(fold)
	return splitedDataset
 
# Calculate accuracy percentage
def calculateAccuracy(actual, predicted):
	correct = 0
	for i in range(len(actual)):
		if actual[i] == predicted[i]:
			correct += 1
	return correct / float(len(actual)) * 100.0
 
# Evaluate an algorithm using a cross validation split
def crossValidate(dataset, kFolds):
	folds = getSplits(dataset, kFolds) #Get Splits
	scores = []
	for fold in folds:
		train_set = list(folds)
		train_set.remove(fold)
		train_set = sum(train_set, []) # "Unfolds" the list ex: sum([[1,2],[3,4]],[]) ==> [1,2,3,4] the numbers represend rows in this case
		test_set= sum([fold],[])
		predicted = buildAndPredict(train_set, test_set)
		actual = [row[-1] for row in fold]
		accuracy = calculateAccuracy(actual, predicted)
		scores.append(accuracy)
	return scores
 
# Split a dataset based on an attribute and an attribute value
def splitBasedOnContinuousAttribute(index, value, dataset):
	left = []
	right = []
	for row in dataset:
		if row[index] < value:
			left.append(row)
		else:
			right.append(row)
	return left, right

# Split a dataset based on an attribute and an attribute value
def splitBasedOnCategoricalAttribute(index, value, dataset):
	left = []
	right = []
	for row in dataset:
		if row[index] == value:
			left.append(row)
		else:
			right.append(row)
	return left, right
 
# Calculate the Gini index for a split dataset
def computeGiniIndex(distribution, classes):
	# count all samples at split point
	nOfEntries = float(sum([len(side) for side in distribution]))
	# sum weighted Gini index for each side
	gini = 0.0
	for side in distribution:
		sideSize = float(len(side))
		# So that we dont divide by 0
		if sideSize == 0: 
			continue
		score = 0.0
		# score the side based on the score for each class
		for class_val in classes:
			p = [row[-1] for row in side].count(class_val) / sideSize
			score += p * p
		# contribute to calculating the weightted gini so that we now how well the split chosen performs
		gini += (1.0 - score) * (sideSize / nOfEntries)
	return gini
 
# Select the best split point for a dataset based on the gini index
def getBestSplit(dataset):
	labels = list(set(row[-1] for row in dataset)) #get the last item of the list (the label)
	bestIndex, bestValue, bestScore, bestDistribution = 99999, 99999, 99999, None #starting point. Typically, they will be replace after the very first split because 0<=gini<=0.5<<999
	for columnIndex in range(len(dataset[0])-1): #Here we skipped the -1 because those are the labels
		for row in dataset:
			if(feautureTypes[columnIndex] == "continous"):
				distribution = splitBasedOnContinuousAttribute(columnIndex, row[columnIndex], dataset) #Split on row[columnIndex] [left,right] (of the tree)
			elif(feautureTypes[columnIndex] == "categorical"):
				distribution = splitBasedOnCategoricalAttribute(columnIndex, row[columnIndex], dataset)

			gini = computeGiniIndex(distribution, labels)
			if gini < bestScore:
				bestIndex, bestValue, bestScore, bestDistribution = columnIndex, row[columnIndex], gini, distribution
	return {'index':bestIndex, 'value':bestValue, 'distribution':bestDistribution} #We dont need to pass the score because it 
 
# Create a terminal node value (leaf)
def leafify(distribution):
	outcomes = [row[-1] for row in distribution]
	return max(set(outcomes), key=outcomes.count)
 
# Create child splits for a node or make terminal
def split(node, depth):
	left, right = node['distribution']
	# if is the sides are empty, we 
	if not left or not right:
		node['left'] = node['right'] = leafify(left + right)
		return
	# check if we reach the max depth
	if depth >= maxDepth:
		node['left'], node['right'] = leafify(left), leafify(right)
		return
	# left child If still didnt reach the minimum size we find the new best split and append it  using the split()

	node['left'] = getBestSplit(left)
	split(node['left'], depth+1)
	# right child

	node['right'] = getBestSplit(right)
	split(node['right'], depth+1)
 
# Build a decision tree (we will be building more trees than usual because we are using cross-validation)
def buildTree(train):
	root = getBestSplit(train)
	split(root, 1) #now that we have found the best split, we can commit with it our tree building
	return root
 
# Make a prediction given a decision tree. Traverse until reaching a leaf
def predict(node, row): 
	if(feautureTypes[node['index']] == "continous"):
		if row[node['index']] < node['value']:
			if isinstance(node['left'], dict):
				return predict(node['left'], row)
			else:
				return node['left']
		else:
			if isinstance(node['right'], dict):
				return predict(node['right'], row)
			else:
				return node['right']
	elif(feautureTypes[node['index']] == "categorical"):
		if row[node['index']] == node['value']:
			if isinstance(node['left'], dict):
				return predict(node['left'], row)
			else:
				return node['left']
		else:
			if isinstance(node['right'], dict):
				return predict(node['right'], row)
			else:
				return node['right']

#Builds and tests a tree
def buildAndPredict(train, test):
	tree = buildTree(train)
	predictions = list()
	for row in test:
		prediction = predict(tree, row)
		predictions.append(prediction)
	return(predictions)
 
def isNumber(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def determineTypeOfFeature(ds):
	feautureTypes = []
	threshold = 5

	for column in ds.columns:
		uniqueValues = ds[column].unique()
		exampleValues = uniqueValues[0]

		if((not isNumber(exampleValues)) or (len(uniqueValues)) <= threshold):
			feautureTypes.append("categorical")
		else:
			feautureTypes.append("continous")

	return feautureTypes

# Load a CSV file
def load(fileName):
	file = open(fileName, "rt")
	lines = reader(file)
	dataset = list(lines)
	return dataset

# load the dataset
fileName = raw_input("Dataset Path (or name if file is in the same directory):")
dataset = load(fileName)

ds = pd.read_csv(fileName)

feautureTypes = determineTypeOfFeature(ds)

# convert string attributes to integers because by deault python reads them as strings
for i in range(len(dataset[0])):
	floatify(dataset, i)

# evaluate algorithm using cross-validation
kFolds = 5
maxDepth = 5
scores = crossValidate(dataset, kFolds) #Build and evaluates it
print('Scores: %s' % scores)
print('Mean Accuracy: %.3f%%' % (sum(scores)/float(len(scores))))