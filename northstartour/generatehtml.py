print("<ul>\n")
for i in range(0,18):
    print('<li id="day' + str(i+1) + '">')
    print("<ul>\n")
    for j in range(0, 5):
        print('<li id="d' + str(i+1) + str(j+1) + '">')
        print('</li>')
    print("</ul>\n")
print("</ul>\n")
