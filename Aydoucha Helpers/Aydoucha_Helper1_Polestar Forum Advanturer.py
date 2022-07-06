import requests
from bs4 import BeautifulSoup as bs
import re
import dateparser
import datetime
import pandas as pd
from xlwt import Workbook
import xlwt
import time

tableOutput = {} #contains interesting links and posts
BritishtableMap = {} #contains british messages
oldOnesDetected = False

BASEURL = 'https://www.polestar-forum.com/forums/polestar-2-forum.5/'
url = BASEURL

postCount = 0
pagesCount = 0

print("Scrapping...")

while(not oldOnesDetected):
    pagesCount += 1
    print("Page "+ str(pagesCount),":")

    response = requests.get(url)
    soup = bs(response.content, "lxml")

    posts = soup.findAll('div', attrs={"class":"california-thread-item"})

    for post in posts:
        postCount += 1
        #1.parse this then if greater than last monday, do the rest, else continue
        
        postDateRaw = post.div.find('div', attrs={"class":"structItem-cell last-post-cell"}).get_text().replace("\n", "").replace(" ", " ").replace(" ","").replace("ago"," ago").replace("by", " by")
        postDateRE = re.search(r"(.*?)( by.*)", postDateRaw)
        parsableDate = postDateRE.group(1)

        if('amoment ago' in postDateRE.group(1)):
            parsableDate = "1 minute ago"
        elif('mo' in postDateRE.group(1)):
            parsableDate = parsableDate.replace("mo", " months")
        elif('d' in postDateRE.group(1)):
            parsableDate = parsableDate.replace("d", " days")
        elif('h' in postDateRE.group(1)):
            parsableDate = parsableDate.replace("h", " hours")
        elif('m' in postDateRE.group(1)):
            parsableDate = parsableDate.replace("m", " minutes")
        elif('s' in postDateRE.group(1)):
            parsableDate = parsableDate.replace("s", " seconds")


        postDate = dateparser.parse(parsableDate)

        if(postDate >= (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().weekday() + 7))):
            tableOutput["https://www.polestar-forum.com/" + post.div.find('div', attrs={"class":"structItem-title"}).find('a', attrs={"class": "thread-title--gtm"}).get("href")] = []
            BritishtableMap["https://www.polestar-forum.com/" + post.div.find('div', attrs={"class":"structItem-title"}).find('a', attrs={"class": "thread-title--gtm"}).get("href")] = []            
        else:
            if(pagesCount != 1):
                oldOnesDetected = True
            continue
    url = "https://www.polestar-forum.com/" + soup.find('a', attrs={"aria-label":"Goto Page " + str(pagesCount + 1)}).get("href")


print("Post Count:"+ str(postCount))
print("Pages Count:"+ str(pagesCount))

print("Traversing Posts and Labeling...")
postUrlIndex = 0
britishCount = 0
for postUrl in tableOutput.keys():
    
    wasBritishFound = False
    response = requests.get(postUrl)
    soup = bs(response.content, "lxml")
    
    chats = soup.findAll('article', attrs={"class":"message message--post js-post js-inlineModContainer california-message"})
    chatIndex = 0
    for chat in chats:
        tableOutput[postUrl].append(chat.find('article', attrs={"class": "message-body js-selectToQuote"}).find('div', attrs={"class": "bbWrapper"}).get_text())
        if(chat.find('span', attrs={"class": "flag-icon flag-icon-gb ml-5"})):
            BritishtableMap[postUrl].append(True)
            wasBritishFound = True
            print("English Chat: ", postUrl)
        else:
            BritishtableMap[postUrl].append(False)

        chatIndex += 1
    
#    if(not wasBritishFound):
#        tableOutput.pop(postUrl)

    postUrlIndex += 1

print("British Count:"+ str(britishCount))

print("Saving...")
book = Workbook()
sheet1 = book.add_sheet('Sheet 1')
st = xlwt.easyxf('pattern: pattern solid;')
st.pattern.pattern_fore_colour = 53

keysList = list(tableOutput.keys())

for i in range(len(tableOutput.keys())):
    if(True in BritishtableMap[keysList[i]]):
        sheet1.write(0 , i, keysList[i], st)
    else:
        sheet1.write(0 , i, keysList[i])

for i in range(len(tableOutput.keys())):
    for j in range(len(tableOutput[keysList[i]])):
        if(BritishtableMap[keysList[i]][j]):
            try:
                sheet1.write(j + 1, i, tableOutput[keysList[i]][j], st)
            except Exception as e:
                print(e)
        else:
            sheet1.write(j + 1, i, tableOutput[keysList[i]][j])


book.save("Week of " + (datetime.datetime.now()  - datetime.timedelta(days=datetime.datetime.now().weekday() + 7)).strftime('%B %d %Y') + '.xls')

print("posts:" + str(postCount))
print("pages:" + str(pagesCount))
print("Done")
print("See you next week \U0001F618")

time.sleep(10)
print("Love you")
time.sleep(1)