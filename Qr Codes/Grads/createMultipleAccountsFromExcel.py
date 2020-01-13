import pandas as pd
import requests
import json
import qrcode



URL = "http://fye-em.aui.ma/automations/r6eDP2EAvoVMgQJobV7L/signup"

undergradList = pd.read_excel (r'DATA.xlsx', sheet_name='Under');
gradList = pd.read_excel (r'DATA.xlsx', sheet_name='Grad');

# print("Hello " + gradList.iloc[[0]].gender)


for i in range(0, undergradList.shape[0]):
    gender = '3';

    # if(undergradList.iloc[[i]].gender.item=='F'):
    #     gender='0'
    # elif(undergradList.iloc[[i]].gender.item=='M'):
    #     gender='1'
    # else:
    #     gender = '3';
    print(str(undergradList.iloc[[i]].mobile_phone.item()).replace(".0",""))
    data = {
                "firstName": undergradList.iloc[[i]].first_name.item(),
            	"lastName": undergradList.iloc[[i]].last_name.item(),
            	"auiID": undergradList.iloc[[i]].ID.item(),
            	"password": undergradList.iloc[[i]].birth_name.item() + str(undergradList.iloc[[i]].ID.item()),
            	"phoneNumber": str(undergradList.iloc[[i]].mobile_phone.item()).replace(".0",""),
            	"country": "Morocco",
            	"gender": gender
            }
    r = requests.post(url = URL, data = data)

    response = json.loads(r.content.decode('utf8').replace("'", '"'))

    if(response['status'] == 'fail'):
        print(str(undergradList.iloc[[i]].ID.item()) + " " + undergradList.iloc[[i]].first_name.item() + " " + undergradList.iloc[[i]].last_name.item())
        print(response)
        print("\n___________________________\n")
    elif(response['status'] == 'success'):
        print(response['data']['user']['auiID'] + " " + response['data']['user']['hashedID'] + ": Qr Code Added")
        print("\n___________________________\n")
        qr = qrcode.QRCode(
            version = 1,
            error_correction = qrcode.constants.ERROR_CORRECT_H,
            box_size = 10,
            border = 4,
        )
        qr.add_data(response['data']['user']['hashedID'])
        qr.make(fit=True)
        img = qr.make_image()
        img.save(str(undergradList.iloc[[i]].ID.item()) +".jpg")
