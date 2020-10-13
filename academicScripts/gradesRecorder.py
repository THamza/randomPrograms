from openpyxl import Workbook

workbook = load_workbook(filename="test.xlsx")
sheet = workbook.sheet1


sheet["A1"] = "hello"
sheet["B1"] = "world!"

workbook.save(filename="hello_world.xlsx");
