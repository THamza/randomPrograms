#model = keras.models.load_model('C:\Users\touhs\OneDrive\Desktop\thesises\lstm_tso.pb')
import sys
import datetime
from worldTime import Time
sys.path.insert(1, './classes')
from device import Device
from scheduler import Scheduler
import msvcrt

startingYear = 2018
startingMonth = 3
startingDay = 15
startingHour = 2

scheduler = None
time = None

deviceLabels = ["Washing Machine", "Dish Washer", "Fridge", "Oven"]
deviceAverageUseTime = [1, 2, -1, 1]
devices = []


def setup():
    global time
    global scheduler
    time = Time(startingYear, startingMonth, startingDay, startingHour)
    scheduler = Scheduler()
    for i in range(len(deviceLabels)):
        devices.append(Device(deviceLabels[i], deviceAverageUseTime[i], time))

def live():
    hoursCount = 0
    while (True):
        if(hoursCount % 24 == 0):
            print("==========Next Day========== ")

        print("------Date: "+str(time.date)+"------\n1.Schedule\n2.add an hour\n")

         Ds = scheduler.getDevicesToRunOn(time.date)

        runDevices(Ds, time)

        choice = msvcrt.getch()
        if(choice == "1"):
            print("\tDevices:")
            for device in devices:
                print("\t-"+device.label)
            d = int(input("\t\t"))
            print("\t\tFor When?")
            year = int(input("\t\tYear:"))
            month = int(input("\t\tMonth:"))
            day = int(input("\t\tDay:"))
            hour = int(input("\t\tHour:"))

            #Make this whole thing into functions. then, instead of scheduling
            #this day by taking user input, you gotta feed it to a function which
            #judge the best date which going to call the lane below with the new date
            scheduler.schedule(devices[d-1], datetime.datetime(year, month, day, hour))
        if(choice == "2"):
            #3600 seconds has passed
            hoursCount = hoursCount + 1
            time.addHours(1)


def runDevices(devices, time):
    for device in devices:
        device.run(time)


setup()
live() #By hour
