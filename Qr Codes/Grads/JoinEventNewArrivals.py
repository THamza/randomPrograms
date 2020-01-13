import pandas as pd
import requests
import json
import qrcode



URL = "http://fye-em.aui.ma/automations/r6eDP2EAvoVMgQJobV7L/event/EVENTVly5YgljoL4MQ3emkLXW/join"

list = pd.read_excel (r'DATA.xlsx', sheet_name='Fall2019_Preregistered');

# print("Hello " + gradList.iloc[[0]].gender)


for i in range(0, list.shape[0]):
    data = {
            	"auiID": list.iloc[[i]].ID.item(),
            }
    r = requests.post(url = URL, data = data)

    response = json.loads(r.content.decode('utf8').replace("'", '"'))

    if(response['status'] == 'fail'):
        print(str(list.iloc[[i]].ID.item())+ " Failed")
        print(response)
        print("\n___________________________\n")
    elif(response['status'] == 'success'):
        print(str(list.iloc[[i]].ID.item())+ " Joined Successfully")
        print("\n___________________________\n")
