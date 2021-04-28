import sys
import datetime
from worldTime import Time
sys.path.insert(1, './classes')
from device import Device
from scheduler import Scheduler
import msvcrt
import tensorflow as tf
import keras

startingYear = 2018
startingMonth = 3
startingDay = 15
startingHour = 2

scheduler = None
time = None
predictionModel = None

deviceLabels = ["Washing Machine", "Dish Washer", "Fridge", "Oven"]
deviceAverageUseTime = [1, 2, -1, 1]
devices = []


def setup():
    global time
    global scheduler
    global predictionModel

    time = Time(startingYear, startingMonth, startingDay, startingHour)
    predictionModel = keras.models.load_model('C:\\Users\\touhs\\OneDrive\\Desktop\\thesises\\lstm_tso.pb')
    pred = predictionModel.predict([0.489865, 0.000000, 0.345712, 0.259122, 0.363029, 0.023878, 0.5345, 0.173314, 0.853590, 0.575472, 0.773109, 0.005352, 0.803922, 0.209394, 1.0, 1.0, 1.0, 1.000000, 0.0, 0.381369, 0.897196, 1.00, 0.333333, 0.861111, 0.0, 0.0,	0.775, 0.191802, 0.901235, 0.921348, 0.133333, 0.277778, 0.0, 0.0, 0.794872, 0.223952, 0.900901, 0.74, 0.055556, 1.000000, 0.0, 0.0, 0.794872, 0.290011, 0.693548, 0.677419, 0.200000, 0.138889, 0.0, 0.0, 0.794872, 0.243608, 0.821918, 0.728261, 0.046512, 0.833333, 0.0, 0.0, 0.775])
    print("Prediction:",pred)
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
