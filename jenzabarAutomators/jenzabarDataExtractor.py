from selenium import webdriver

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from tqdm import tqdm
from pprint import pprint


baseURL="https://my.aui.ma"
AUIID ="30614"
Password = "AuiI2020"
gradebookURLs = []

driver = webdriver.Chrome()
driver.get(baseURL)

print(driver.title)
print(driver.current_url)


# Select the id box
print("Finding Loging Elements...")
usernameBox = driver.find_element_by_name('userName')
passwordBox = driver.find_element_by_name('password')


# Send id information
print("Entering Creditentials...")
usernameBox.send_keys(AUIID)
passwordBox.send_keys(Password)


print("Submitting...")
# Find login button
submitLoginBtn = driver.find_element_by_name('siteNavBar$btnLogin')# Click login
submitLoginBtn.click()

print("Going to LMS...")
driver.get("https://my.aui.ma/ICS/LMS")



print("Requesting Past Courses...")

period = driver.find_element_by_name("pg0$V$ddShowMenu")
for option in period.find_elements_by_tag_name('option'):
    if option.get_attribute('value') == "0":
        print("Found")
        option.click() # select() in earlier versions of webdriver
        break


print("Looking for tables...")
containers = driver.find_elements_by_xpath('.//div[@class="pSection"]')
if(containers != None):
    print("Found: ", len(containers) , " containers")

for items in containers:
    drawers = items.find_elements_by_xpath('//div[@class="drawer"]')
    print("Number of Semesters: ", len(drawers))

    for j in tqdm(range(0,len(drawers))):

        middleDiv = drawers[j].find_element_by_xpath('.//div[@class="drawer-container default-border-alternate-one secondary-alternate-background-one"]')
        tableDiv = middleDiv.find_element_by_xpath('.//div[@class="default-top-border-alternate-one collapse in"]')

        table = tableDiv.find_element_by_xpath(".//table[@class='amcGenericTable']")

        rows = table.find_elements_by_xpath('.//tr[@class = "alt"|@class = "" |@class]')

        # print("\nNumber of columns: ",len(rows), "(Using 10)" )


        for i in range(0,len(rows)):
            cells = rows[i].find_elements_by_tag_name('td')
            for k in range(0,len(cells)):

                    if(cells[k].text[0:2] == "--"):
                        if(cells[k].find_elements_by_tag_name('a') != 0):
                            gradebookURLs.append(cells[k].find_element_by_tag_name('a').get_attribute('href'))
                        # print(cell.find_element_by_tag_name('a').get_attribute('href') , "\n")
                        # print(cells[k-2].text, " Added: ", cells[k].find_element_by_tag_name('a').get_attribute('href'))


console.log(gradebookURL)
for gradebookURL in gradebookURLs:
    driver.get(gradebookURL)
    viewFullGradebookBtn = driver.find_element_by_id('pg0_V_FullGradebookLink')
    viewFullGradebookBtn.click()

    viewFullGradebookBtn = driver.find_element_by_id('pg0_V_NavBar_ExportButton')
    viewFullGradebookBtn.click()

    break


print("Done...")
