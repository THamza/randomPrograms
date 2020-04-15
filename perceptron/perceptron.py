
def sign(n):
	if(n>=0):
		return 1
	return -1

w0 = -0.4
weights = [-0.4, 0, 0.4, 0.2]

epochs = 2
nParam = 3
lr = 0.1
data = [[1, 0, 0, -1],[1, 0, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 1], [0, 0, 1, -1], [0, 1, 0, -1,], [0, 1, 1, 1], [0, 0, 0, -1]]

for i in range(0,epochs):
	print("Epoch #"+str(i+1)+":")
	print("")
	for di, d in enumerate(data):
		print("    X"+str(di)+":")
		weightedSum = 0
		for k in range(0, nParam):
			weightedSum += d[k]*weights[k]
		prediction = w0 + sign(weightedSum)
		print("        Predict:")
		print("            y(hat)" + str(di) + " = "+ str(w0) +" + Sigma(" + str(weightedSum) + ") = " + str(prediction))
		
		print("        Update:")
		for wi in range(0,len(weights)):
			weights[wi] = weights[wi] + 0.1 * (d[3] - prediction) * d[wi]
			print("            w" + str(wi) + " = " + str(weights[wi]) + str(lr) + " * ( " + str((d[3] - prediction)) + " ) *" + str(d[wi]) + " = " + str(weights[wi]))
		w0 = w0 + lr * (d[3] - prediction) + 1

		print("                        _________________________")
		print("")




