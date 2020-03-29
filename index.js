function createEmployeeRecord(arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record

}

function createEmployeeRecords(arr) {
   let record =  arr.map( x => createEmployeeRecord(x))
   return record
}

function createTimeInEvent(record, date) {
    let hour = date.split(" ")[1]
    let event = {
        type: "TimeIn",
        date: date.split(" ")[0],
        hour: parseInt(hour)
    }
    record.timeInEvents.push(event)
    return record
}

function createTimeOutEvent(record, date) {
    let hour = date.split(" ")[1]
    let event = {
        type: "TimeOut",
        date: date.split(" ")[0],
        hour: parseInt(hour)
    }
    record.timeOutEvents.push(event)
    return record
}

function hoursWorkedOnDate(record, date) {
    let inEvent = record.timeInEvents.find(event => event.date === date )
    let hourIn = inEvent.hour

    let outEvent = record.timeOutEvents.find(event => event.date === date)
    let hourOut = outEvent.hour

    let worked = (hourOut - hourIn)/ 100
    return worked
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date)
    let wage = record.payPerHour
    return hours * wage
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(function(e) {
        return e.date
    })
    let earned = dates.reduce(function(memo, date) {
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

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }