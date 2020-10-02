import sys

sys.path.insert(1, './utils')
from utils import getRandomString

entries = {}

nameLength = 5

class Scheduler:
    def __init__(self, name=getRandomString(nameLength)):
      self.name = name

    def schedule(self, device, date):
        global entries
        entries[date] = device

    def getDevicesToRunOn(self, now):
        devices = []
        for entry in entries:
            if(now == entry):
                devices.append(entries[entry])
        return devices

    def getEntries(self):
        return entries
