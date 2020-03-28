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
    employee.timeInEvents = {
        type: "TimeIn",
        in: time
    }
    return employee;
}