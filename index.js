let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

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
    return array.map(el => {
        return createEmployeeRecord(el)
    })
}

function createTimeInEvent(obj, dataStamp) {
    const time = dataStamp.split(' ')
    const dateTime = time[0]
    const hourTime = parseInt(time[1])

    const timeObj = {
        type: 'TimeIn',
        hour: hourTime,
        date: dateTime
    }

    obj.timeInEvents.push(timeObj)
    return obj
}

function createTimeOutEvent(obj, dataStamp) {
    const time = dataStamp.split(' ')
    const dateTime = time[0]
    const hourTime = parseInt(time[1])

    const timeObj = {
        type: 'TimeOut',
        hour: hourTime,
        date: dateTime
    }

    obj.timeOutEvents.push(timeObj)
    return obj
}

function hoursWorkedOnDate(obj, dateTime) {
    let startHour = obj.timeInEvents.filter(el => { return el.date === dateTime })[0].hour
    let endHour = obj.timeOutEvents.filter(el => { return el.date === dateTime })[0].hour

    return (endHour - startHour) / 100;
}

function wagesEarnedOnDate(obj, dateTime) {
    const hoursWorked = hoursWorkedOnDate(obj, dateTime)
    const payRate = obj.payPerHour

    return hoursWorked * payRate
}

function allWagesFor(obj) {
    const wages = obj.timeInEvents.map(el => {
        return wagesEarnedOnDate(obj, el.date)
    })

    return wages.reduce((a, b) => a + b, 0);
}

function calculatePayroll(array) {
    const allWages = array.map(el => {
        return allWagesFor(el);
    })

    return allWages.reduce((a, b) => a + b, 0);
}

function findEmployeeByFirstName(srcArray, queryName) {
    return srcArray.find(el => {
        return el.firstName === queryName
    });
}

// let first = createEmployeeRecords(twoRows)[0]
// createTimeInEvent(first, "2014-02-28 1400")
// console.log(first)