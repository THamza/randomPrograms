import datetime

class Time:
  date = 0
  def __init__(self, startingYear, startingMonth, startingDay, startingHour):
    self.date = datetime.datetime(startingYear, startingMonth, startingDay, startingHour)


  def addHours(self, n):
      self.date = self.date + datetime.timedelta(hours=n)


  def addDays(self, n):
      self.date = self.date + datetime.timedelta(days=n)
