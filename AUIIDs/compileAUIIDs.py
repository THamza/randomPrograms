import xlwt 
from xlwt import Workbook
from bs4 import BeautifulSoup
import pandas as pd 

list = pd.read_excel (r'DATA.xlsx', sheet_name='Sheet1');
f = open("optionTagsFromGm.txt","r")
fileContent = f.read()

soup = BeautifulSoup(fileContent, 'lxml')
options = soup.findAll('option')
print(options[1].attrs['value'])
print(options[1].text.replace(options[1].attrs['value'],""))

# Workbook is created 
wb = Workbook() 
  
# add_sheet is used to create sheet. 
sheet1 = wb.add_sheet('Sheet 1',cell_overwrite_ok=True) 

  
sheet1.write(0, 0, 'ID')
sheet1.write(0, 1, 'first_name')
sheet1.write(0, 2, 'last_name')


for i in range(0, list.shape[0]):
	sheet1.write(i+1, 0, list.iloc[[i]].ID.item())
	sheet1.write(i+1, 1, list.iloc[[i]].first_name.item())
	sheet1.write(i+1, 2, list.iloc[[i]].last_name.item())
	j = i;


# for i in range(list.shape[0], list.shape[0] + len(options)):
# 	sheet1.write(i,0, options[i-list.shape[0]].attrs['value'])


  
wb.save('AUIIDs.xls') 