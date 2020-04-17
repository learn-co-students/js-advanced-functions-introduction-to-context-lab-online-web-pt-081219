// Your code here

function createEmployeeRecord(array){
    let x = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return x
};

function createEmployeeRecords(array){
    let records = array.map(x => createEmployeeRecord(x))
    return records 

}

function createTimeInEvent(employee, dateStamp){
    let dateArray = dateStamp.split(" ")
    let date = dateArray[0]
    let hour = parseInt(dateArray[1])

    let event = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let dateArray = dateStamp.split(" ")
    let date = dateArray[0]
    let hour = parseInt(dateArray[1])

    let event = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    employee.timeOutEvents.push(event)
    return employee
   
}

function hoursWorkedOnDate(employee, date){
    let timeInHours = employee.timeInEvents.find(x=> x.date === date).hour
    let timeOutHours = employee.timeOutEvents.find(x=> x.date === date).hour

    let totalHours = (timeOutHours - timeInHours)/100
    
    return totalHours
}

function wagesEarnedOnDate(employee, date){
    let wagesEarned = (employee.payPerHour) * (hoursWorkedOnDate(employee, date))
    return wagesEarned
}

function findEmployeeByFirstName(srcArray, fn){
    let x = srcArray.find(x => x.firstName = fn)
    return x
}

function allWagesFor(employee){
    let allDates = employee.timeInEvents.map(x => x.date)

    let totalWages = allDates.map(x => wagesEarnedOnDate(employee, x)).reduce(function(a,b){return a+b})
    
    return totalWages
}

function calculatePayroll(employeeRecords){
    let total = employeeRecords.map(x => allWagesFor(x)).reduce(function(a,b){return a+b})
    
    return total

}

