// Your code here

let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
// ✓ populates a firstName field from the 0th element
// ✓ populates a familyName field from the 1th element
// ✓ populates a title field from the 2th element
// ✓ populates a payPerHour field from the 3th element
// ✓ initializes a field, timeInEvents, to hold an empty Array
// ✓ initializes a field, timeOutEvents, to hold an empty Array

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
// process an Array of Arrays into an Array of employee records
// has a function called createEmployeeRecords
//createEmployeeRecords
//creates two records
//correctly assigns the first names

let createTimeInEvent = function(employee, dateStamp) {
   let [date,hour] = dateStamp.split(' ')
   employee.timeInEvents.push({
       type: "TimeIn",
       hour: parseInt(hour, 10),
       date

   })
    return employee
}

let createTimeOutEvent = function( employee, dateStamp) {
    let [date,hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
     return employee
}


let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}