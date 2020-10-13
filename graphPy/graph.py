import random
import names

nOfNodes = 5
maxNOfConnections = 10
minNOfConnections = 1

nodeNames = []

graph = {}

for i in range(0,nOfNodes):
    nodeNames.append(names.get_first_name())

for name in nodeNames:
    for i in range(random.randrange(minNOfConnections, maxNOfConnections)):
        if name in graph:
          graph[name].append(nodeNames[random.randrange(0, nOfNodes)])
        else:
          graph[name] = [nodeNames[random.randrange(0, nOfNodes)]]

print(graph)
