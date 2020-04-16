
def sign(n):
	if(n>=0):
		return 1
	return -1

w0 = -0.4
weights = [0, 0.4, 0.2]

epochs = 2
nParam = 3
lr = 0.1
data = [[1, 0, 0, -1],[1, 0, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 1], [0, 0, 1, -1], [0, 1, 0, -1,], [0, 1, 1, 1], [0, 0, 0, -1]]



for i in range(0,epochs):
	print("Epoch #"+str(i+1)+":")
	print("")
	for di, d in enumerate(data):
		print("    X"+str(di)+":")
		print("        Predict:")
		weightedSum = 0
		print("            Weighted Sum: ", end="")
		for k in range(0, nParam):
			if(k==0):
				print(d[k], " * ", weights[k], end="")
			else:
				print(" + ", d[k], " * ", weights[k], end="")

			weightedSum += d[k]*weights[k]

		prediction =  sign(weightedSum + w0)
		print(" = {:.2f}".format(weightedSum))

		print("            y(hat)" + str(di) + " = sign(" + str(weightedSum  + w0) + ") = " + str(prediction))
		
		print("        Update:")
		for wi in range(0,len(weights)):
			print("            w" + str(wi+1) + " = " + str(weights[wi]) + " * " +str(lr) + " * ( " + str(d[3]) +" - " + str(prediction) + " ) * " + str(d[wi]) +" = " + str(weights[wi] + 0.1 * (d[3] - prediction) * d[wi]))
			weights[wi] = weights[wi] + 0.1 * (d[3] - prediction) * d[wi]
		
		print("            w0 = " + str(w0) + " * " +str(lr) + " * ( " + str(d[3]) +" - " + str(prediction) + " ) * 1 = {:.2f}".format(w0 + lr * (d[3] - prediction) + 1))
		w0= w0 + lr * (d[3] - prediction) + 1
		w0 = float("{:.2f}".format(w0))

		print("                        _________________________")
		print("")



