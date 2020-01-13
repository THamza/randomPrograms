import pandas as pd
import requests
import json
import qrcode



URL = "http://fye-em.aui.ma/automations/r6eDP2EAvoVMgQJobV7L/user/data"

list = pd.read_excel (r'DATA2.xlsx', sheet_name='Sheet1');


# print("Hello " + gradList.iloc[[0]].gender)


for i in range(0, list.shape[0]):
    gender = '3';

    # if(list.iloc[[i]].gender.item=='F'):
    #     gender='0'
    # elif(list.iloc[[i]].gender.item=='M'):
    #     gender='1'
    # else:
    #     gender = '3';
    print(str(list.iloc[[i]].mobile_phone.item()).replace(".0",""))
    data = {
                "ID": list.iloc[[i]].ID.item()
            }
    r = requests.post(url = URL, data = data)

    response = json.loads(r.content.decode('utf8').replace("'", '"'))

    if(response['status'] == 'fail'):
        print(str(list.iloc[[i]].ID.item()) + " " + list.iloc[[i]].first_name.item() + " " + list.iloc[[i]].last_name.item())
        print(response)
        print("\n___________________________\n")
    elif(response['status'] == 'success'):
        print(response['data']['auiID'] + " " + response['data']['hashedID'] + ": Qr Code Added")
        print("\n___________________________\n")
        qr = qrcode.QRCode(
            version = 1,
            error_correction = qrcode.constants.ERROR_CORRECT_H,
            box_size = 10,
            border = 4,
        )
        qr.add_data(response['data']['hashedID'])
        qr.make(fit=True)
        img = qr.make_image()
        img.save(str(list.iloc[[i]].ID.item()) +".jpg")
