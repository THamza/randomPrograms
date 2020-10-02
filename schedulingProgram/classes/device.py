import datetime

class Device:
    runtime = 0
    startTime = 0
    endTime = 0
    def __init__(self, label, avgUseTime, date):
        self.label = label
        self.createdAt = date
        self.avgUseTime = avgUseTime
        self.numberOfUses = 0

    def run(self, time):
        startTime = time
        print(self.label + " is starting (" + str(time) + ")")

    def stop(self):
        endTime = datetime.datetime.now()
        differenceTime = endTime - startTime
        self.avgUseTime = ((self.avgUseTime * self.numberOfUses ) + differentTime.seconds) / (self.numberOfUses + 1)
        self.numberOfUses = self.numberOfUses + 1
        print(self.label, " stopped")

    def stats(self):
        print(self.label, ":\nAverage Use time:", self.avgUseTime, "\nNumber of users:", self.nassistantpinglinumberOfUses)
