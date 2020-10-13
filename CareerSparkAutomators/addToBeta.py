import pandas as pd
import requests
import json



URL = "https://api.auicareerspark.com/r6eDP2EAvoVMgQJobV7L/beta/add"

list = pd.read_excel (r'DATA.xlsx', sheet_name='Sheet1');

# print("Hello " + gradList.iloc[[0]].gender)
successes = 0
failures = 0
entries = 0

for i in range(0, list.shape[0]):
    data = {
            	"aui_id": list.iloc[[i]].ID.item(),
            }
    r = requests.post(url = URL, data = data)

    response = json.loads(r.content.decode('utf8').replace("'", '"'))
    entries = 0
    if(response['status'] == 'fail'):
        entries = entries + 1
        failures = failures + 1
        print(str(list.iloc[[i]].ID.item())+ " Failed")
        print(response)
        print("\n___________________________\n")
    elif(response['status'] == 'success'):
        entries = entries + 1
        successes = successes + 1
        print(str(list.iloc[[i]].ID.item())+ " Joined Beta Successfully")
        print("\n___________________________\n")

print('Done!   Success:', successes, "/", entries, "  |  Failures:", successes, "/", entries)
print("Weird Cases:", entries - (successes + failures), "/", entries)