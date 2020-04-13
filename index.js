function createEmployeeRecord([firstName, familyName, title, payPerHour]) {

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    } 
}

function createEmployeeRecords(records) {
    let empRecords = records.map(createEmployeeRecord);
    return empRecords;
}

function createTimeInEvent(empRecord, dateStamp) {
    let h = parseInt(dateStamp.slice(11));
    let d = dateStamp.slice(0,10);
    empRecord.timeInEvents.push({
        type: "TimeIn",
        hour: h,
        date: d
    });
    return empRecord;
}

function createTimeOutEvent(empRecord, dateStamp) {
    let h = parseInt(dateStamp.slice(11));
    let d = dateStamp.slice(0,10);
    empRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: h,
        date: d
    });
    return empRecord;
}

function hoursWorkedOnDate(record, date) {
    //find timeInEvent for the date
    let inTime = record.timeInEvents.find((e) => e.date === date) 
    //find timeOutEvent for the date
    let outTime = record.timeOutEvents.find((e) => e.date === date)
    //find hours worked by subtracting time in from time out
    let hoursWorked = (outTime.hour - inTime.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(record, date){
    let pay = hoursWorkedOnDate(record, date) * record.payPerHour
    return pay
}

function allWagesFor(record){
    //find all dates worked
    let workedDates = record.timeInEvents.map((e) => e.date)
    //find wages earned for all dates
    let wages = workedDates.map((d) => wagesEarnedOnDate(record, d))
    //add wages together
    let payAlldates = wages.reduce((total, e) => total + e)
    
    return payAlldates
}

function findEmployeeByFirstName(records, firstName) {
    const empRecord = records.find((r) => r.firstName === firstName)
    return empRecord
}

function calculatePayroll(records) {
    let allPay = records.map(allWagesFor);
    allPay = allPay.reduce((total, p) => total + p)
    return allPay
}