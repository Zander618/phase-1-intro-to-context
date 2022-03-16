function createEmployeeRecord(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array){
  return array.map((e) => createEmployeeRecord(e));
}

function createTimeInEvent(array, dateStamp) {
  let [dates, hours] = dateStamp.split(" ");
  let inTime = {
    type: "TimeIn",
    hour: parseInt(hours),
    date: dates
  }
  
  array.timeInEvents.push(inTime)
  return array
}

function createTimeOutEvent(array, dates){
  let [date, hour] = dates.split(" ");
  let outTime = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  }
  array.timeOutEvents.push(outTime)
  return array
}

function hoursWorkedOnDate(obj, date){
  const inTime = obj.timeInEvents.find(inTime => inTime.date === date)
  const outTime = obj.timeOutEvents.find(oTime => oTime.date === date)
  return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(obj, date){
  return hoursWorkedOnDate(obj, date) * (obj.payPerHour)
}

function allWagesFor (obj){
  let workedDays = obj.timeInEvents.map(function (e){
    return e.date
  })

  let payable = workedDays.reduce(function (memo, d){
    return memo + wagesEarnedOnDate(obj, d)
  }, 0)
  return payable
}

function calculatePayroll(array){
  return array.reduce((total, rec) => {
    return total + allWagesFor(rec)
  }, 0)
}