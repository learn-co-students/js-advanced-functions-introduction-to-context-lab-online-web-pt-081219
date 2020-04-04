// Your code here

function createEmployeeRecord(arr){
    let employee = {};
    employee.firstName = arr[0];
    employee.familyName = arr[1];
    employee.title = arr[2];
    employee.payPerHour = arr[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(arrs){
    let employees = [];
    arrs.forEach(element => {
        let newEmployee = createEmployeeRecord(element);
        employees.push(newEmployee);
    });
    return employees;

}

function createTimeInEvent(employee, date){
    let event = {};
    event.type = "TimeIn";
    let times = date.split(" ");
    event.date = times[0];
    event.hour = parseInt(times[1]);
    employee.timeInEvents.push(event);
    return employee;
}

function createTimeOutEvent(employee, date){
    let timeOutEvent = {};
    timeOutEvent.type = "TimeOut";
    let times = date.split(" ");
    timeOutEvent.date = times[0];
    timeOutEvent.hour = parseInt(times[1]);
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(x => x.date == date);
    let timeOut = employee.timeOutEvents.find(x => x.date == date);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee){
    let total = 0;
    employee.timeOutEvents.forEach(event =>
        total = total+ wagesEarnedOnDate(employee, event.date)
    );
    return total;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(x => x.firstName == firstName);
}

function calculatePayroll(employees){
    let total = 0;
    employees.forEach(employee =>
        total +=  allWagesFor(employee)
    );
    return total;
}