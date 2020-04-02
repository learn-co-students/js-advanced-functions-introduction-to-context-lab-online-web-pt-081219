// Your code here
function createEmployeeRecord(newEmployeeInfo){
    let record = {
        firstName: newEmployeeInfo[0],
        familyName: newEmployeeInfo[1],
        title: newEmployeeInfo[2],
        payPerHour: newEmployeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(arrayOfRecords){
    let record = arrayOfRecords.map(x => createEmployeeRecord(x))
    return record
}

function createTimeInEvent(employeeRecord, date){
    let hour = date.split(" ")[1]
    let event = {
        type: "TimeIn",
        date: date.split(" ")[0],
        hour: parseInt(hour)
    }
    employeeRecord.timeInEvents.push(event)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, date){
    let hour = date.split(" ")[1]
    let event = {
        type: "TimeOut",
        date: date.split(" ")[0],
        hour: parseInt(hour)
    }
    employeeRecord.timeOutEvents.push(event)
    return employeeRecord
}

function hoursWorkedOnDate(record, date){
    let inEvent = record.timeInEvents.find(e => e.date === date)
    let hourIn = inEvent.hour

    let outEvent = record.timeOutEvents.find(e => e.date === date)
    let hourOut = outEvent.hour

    let hoursWorked = (hourOut - hourIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(record, date){
    let hoursWorked = hoursWorkedOnDate(record, date)
    let wage = record.payPerHour

    return wage * hoursWorked
}

function allWagesFor(record){
    let dates = record.timeInEvents.map(e => {
        return e.date
    })
    let earned = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(record, date)
    }, 0)
    return earned
}

function calculatePayroll(records) {
    let total = records.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
    return total 
}

function findEmployeeByFirstName(src, firstName) {
    return src.find(record => {
        return record.firstName === firstName;
    })
}