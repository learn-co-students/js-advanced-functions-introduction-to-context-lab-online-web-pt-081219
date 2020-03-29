// Your code here
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
}

function createEmployeeRecords(arrArrays){
   let objArray =  arrArrays.map(array => createEmployeeRecord(array))
   return objArray
}

function createTimeInEvent(employee, dateStamp){
    let timeInEvent = { 
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1], 10), 
        date: dateStamp.split(' ')[0]
    }

    employee.timeInEvents.push(timeInEvent)

    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let timeOutEvent = { 
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1], 10), 
        date: dateStamp.split(' ')[0]
    }

    employee.timeOutEvents.push(timeOutEvent)

    return employee
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)

    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked
}

function wagesEarnedOnDate(employee, date){
    let wagesEarned = hoursWorkedOnDate(employee,date)*employee.payPerHour
    return wagesEarned
}

function allWagesFor(employee){
    let daysWorked = employee.timeInEvents;
    let pay = daysWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date.date), 0)
    return pay
}

function findEmployeeByFirstName(srcArray, name){
    let reqEmployee = srcArray.find(employee => employee.firstName === name );
    return reqEmployee
}

function calculatePayroll(employees){
    let employeeWages = employees.map(employee => allWagesFor(employee));
    let totalPayroll = employeeWages.reduce((total, wageBill) => total + wageBill)
    return totalPayroll
}