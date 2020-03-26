// Your code here

function createEmployeeRecord(entry) {
    let employee = {}
    employee.firstName = entry[0]
    employee.familyName = entry[1]
    employee.title = entry[2]
    employee.payPerHour = entry[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
};

function createEmployeeRecords(list) {
    return list.map(function(entry) {
        return createEmployeeRecord(entry)
    })
};

function createTimeInEvent(employee, stamp) {
    let time = stamp.split(' ')
    let timeLog = {} 
    timeLog.type = "TimeIn"
    timeLog.date = time[0]
    timeLog.hour = parseInt(time[1])
    employee.timeInEvents.push(timeLog)
    return employee
};

function createTimeOutEvent(employee, stamp) {
    let time = stamp.split(' ')
    let timeLog = {}
    timeLog.type = "TimeOut"
    timeLog.date = time[0]
    timeLog.hour = parseInt(time[1])
    employee.timeOutEvents.push(timeLog)
    return employee
};

function hoursWorkedOnDate(employee, requestDate) {
    function matchDate(entry){
        return entry.date === requestDate
    };
    let logIn = employee.timeInEvents.find(matchDate)
    let logOut = employee.timeOutEvents.find(matchDate)
    let findHours = logOut.hour - logIn.hour
    let hoursWorked = findHours * .01
    return hoursWorked
};

function wagesEarnedOnDate(employee, requestDate) {
    let hoursWorked = hoursWorkedOnDate(employee, requestDate)
    let payRate = employee.payPerHour
    return hoursWorked * payRate
};

function allWagesFor(employee) {
    let range = employee.timeInEvents
    let wages = 0
    range.forEach(function(entry) {
        let date = entry.date
        let wage = wagesEarnedOnDate(employee, date)
        wages = wages + wage
        return wages
    })
    return wages
}

function calculatePayroll(employees) {
    let totalWages = 0
    employees.forEach(function(employee){
        let wage = allWagesFor(employee)
        totalWages = totalWages + wage
        return totalWages
    })
    console.log(totalWages)
    return totalWages
};  

function findEmployeeByFirstName(employees, name) {
    let employee = employees.find(function(employee){
        return employee.firstName === name
    })
    console.log(employee)
    return employee
}