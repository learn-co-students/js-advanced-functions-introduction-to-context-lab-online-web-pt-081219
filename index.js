// Your code here

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(function (row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function (employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function (employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function (employee, searchDate) {
    let timeIn = employee.timeInEvents.find(function (e) {
        return e.date === searchDate
    })

    let timeOut = employee.timeOutEvents.find(function (e) {
        return e.date === searchDate
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function (employee, searchDate) {
    return hoursWorkedOnDate(employee, searchDate) * employee.payPerHour
}

let allWagesFor = function (employee) {
    let workedDates = employee.timeInEvents.map(function (e) {
        return e.date
    })

    let wages = workedDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return wages
}

let calculatePayroll = function (employeesArray) {
    return employeesArray.reduce(function (memo, d) {
        return memo + allWagesFor(d)
    }, 0)
}

let findEmployeeByFirstName = function (employeesArray, input) {
    return employeesArray.find(function (e) {
        return e.firstName === input
    })
}