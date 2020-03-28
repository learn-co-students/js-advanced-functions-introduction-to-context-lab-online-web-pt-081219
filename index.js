// Your code here

function createEmployeeRecord(record) {
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(employees) {
    employees = employees.map(employee => {
        return createEmployeeRecord(employee);
    });
    return employees;
}

function createTimeInEvent(employee, time) {
    let [date, hour] = time.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee
}

function createTimeOutEvent(employee, time) {
    let [date, hour] = time.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee
}

function hoursWorkedOnDate(employee, workingDate) {
    let inEvent = employee.timeInEvents.find(event => event.date === workingDate);
    let outEvent = employee.timeOutEvents.find(event => event.date === workingDate);
    try {
        return (outEvent.hour - inEvent.hour) / 100;
    } catch(e){
        console.error(e.name + ": " + e.message);
        console.error("Missing date field!");
    }
}

function wagesEarnedOnDate(employee, workingDate) {
    let hoursWorked = hoursWorkedOnDate(employee, workingDate);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    let wages = dates.map(date => wagesEarnedOnDate(employee, date));

    let total = wages.reduce(add, 0);

    return total;
}

function calculatePayroll(employees) {
    let allPayroll = employees.map(employee => allWagesFor(employee));
    let totalPayroll = allPayroll.reduce(add, 0);
    return totalPayroll;
}

function findEmployeeByFirstName(employees, firstName) {
    let employee = employees.find(emp => emp.firstName == firstName);
    return employee;
}

//helper function for reduce
function add(total, wage) {
    return total + wage;
}