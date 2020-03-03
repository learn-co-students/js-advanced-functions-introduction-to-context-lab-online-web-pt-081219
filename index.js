// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0], 
        familyName: employee[1],
        title: employee[2], 
        payPerHour: employee[3],
        timeInEvents: [], 
        timeOutEvents: [] 
    }
}; 

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(employee => createEmployeeRecord(employee)
)}; 

function createTimeInEvent(employee, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(time), 
        date: date
    })
    return employee
}; 

function createTimeOutEvent(employee, dateStamp) {
    let [date, time] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(time, 10), 
        date: date
    })
    return employee
}; 

function hoursWorkedOnDate(employee, date) {
    let dateIn = employee.timeInEvents.find(day => day.date === date)
    let dateOut = employee.timeOutEvents.find(day => day.date === date)
    let hoursWorked = (dateOut.hour - dateIn.hour) / 100 
    return hoursWorked 
}; 

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}; 

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(day => day.date)
    let wages = daysWorked.map(date => wagesEarnedOnDate(employee, date))
    return wages.reduce((total, wage) => total + wage, 0)
}; 

function calculatePayroll(employeeArrays) {
    let payroll = employeeArrays.reduce((total, employee) => total + allWagesFor(employee), 0)
    return payroll
}; 

function findEmployeeByFirstName(employeeArray, firstName) {
    return employeeArray.find(employee => employee.firstName === firstName)
}; 