function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfEmployees) {
  return arrayOfEmployees.map((singleArray) => {
    return createEmployeeRecord(singleArray);
    // TODO: Review this concept of implicit/allowed returns
    // Why do I need a return here if I used map???
    // Return won't work inside a forEach
  });
}

function createTimeInEvent(employee, dateStamp) {
  let timeInObj = {
    type: "TimeIn",
    date: dateStamp.slice(0, 10),
    hour: parseInt(dateStamp.slice(11)),
  };
  employee.timeInEvents.push(timeInObj);

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: dateStamp.slice(0, 10),
    hour: parseInt(dateStamp.slice(11)),
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let targetDateIn = employee.timeInEvents.filter((timeInEvent) => {
    return timeInEvent.date === date;
  });

  let targetDateOut = employee.timeOutEvents.filter((timeOutEvent) => {
    return timeOutEvent.date === date;
  });

  return (targetDateOut[0].hour - targetDateIn[0].hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  // let allDates = [];
  // for (let event of employee.timeInEvents) {
  //   allDates.push(event.date);
  // }

  // let allWages = [];
  // for (let date of allDates) {
  //   allWages.push(wagesEarnedOnDate(employee, date));
  // }

  // return allWages.reduce((sum, wage) => {
  //   return sum + wage;
  // });

  return employee.timeInEvents.reduce((sum, timeInEvent) => {
    return sum + wagesEarnedOnDate(employee, timeInEvent.date);
  }, 0);
}

function calculatePayroll(employeesArray) {
  // let companyWages = [];

  // for (let employee of employeesArray) {
  //   companyWages.push(allWagesFor(employee));
  // }

  // return companyWages.reduce((sum, wage) => {
  //   return sum + wage;
  // });

  return employeesArray.reduce((sum, employee) => {
    return sum + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(employeesArray, firstName) {
  return employeesArray.find((employee) => employee.firstName === firstName);
}
