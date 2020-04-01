function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
      }
    return employee
};

function createEmployeeRecords(array) {
  return array.map(e => createEmployeeRecord(e))
};

function createTimeInEvent(employee, date) {
  let punch = date.split(" ")
  let timein = {
    type: "TimeIn",
    hour: parseInt(punch[1]),
    date: punch[0]
  }
  employee.timeInEvents.push(timein)
  return employee
};

function createTimeOutEvent(employee, date) {
  let punch = date.split(" ")
  let timeout = {
    type: "TimeOut",
    hour: parseInt(punch[1]),
    date: punch[0]
  }
  employee.timeOutEvents.push(timeout)
  return employee
};

function hoursWorkedOnDate(employee, date) {
    let inPunch = employee.timeInEvents.find(e => e.date === date)
    let outPunch = employee.timeOutEvents.find(e => e.date === date)
    let hoursWorked = (outPunch.hour - inPunch.hour) / 100
    return hoursWorked
};

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date)
  let pay = hours * employee.payPerHour
  return pay
};

function allWagesFor(employee) {
  // let dates = employee.timeInEvents.map(e => e.date);
  // let wages = dates.map(date => wagesEarnedOnDate(employee, date));
  // return wages.reduce((total, wage) => total + wage), 0)
  // DRY's up to...
  return employee.timeInEvents.reduce((total, punch) => total + wagesEarnedOnDate(employee, punch.date), 0)
};


function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(emp => emp.firstName === firstName)
};

function calculatePayroll(employees) {
  let payroll = employees.reduce((total, record) => total + allWagesFor(record), 0)
  return payroll
};