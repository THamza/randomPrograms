
import requests
import json
from bs4 import BeautifulSoup as BS
import string
import itertools
from tqdm import tqdm

URL = "http://www.blackcoach.ch/divers/VideoCachee/Reponse.php"

# print("Hello " + gradList.iloc[[0]].gender)

def generate_strings(length=4):
    chars = string.ascii_lowercase
    for item in itertools.product(chars, repeat=length):
        yield "".join(item)
count = 0  
combinations= 62 ** 4
for value in generate_strings():  
    if(count >= 1995):
        r = requests.post(url = URL, data = { "LeCode": value})
        soup = BS(r.text)
        if(type(soup.find('div', {'class':'TitreChapitre'}).text) == "NoneType"):
            print(value)
            break
        if(not "Non, le code n'est pas" in soup.find('div', {'class':'TitreChapitre'}).text):
            print(value)
            break
        else:
            count = count + 1
            print(count, "/", combinations, "  => ", value)
    else:
        count = count + 1;
   
