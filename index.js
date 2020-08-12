const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (nestedEmployeeArray) => {
  const result = [];
  nestedEmployeeArray.forEach(employeeArray => result.push(createEmployeeRecord(employeeArray)))
  return result;
}

const createTimeInEvent = (employeeObject, dateStamp) => {
  const timeObject = {
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0], 
  };

  employeeObject.timeInEvents.push(timeObject);
  return employeeObject;
}

const createTimeOutEvent = (employeeObject, dateStamp) => {
  const timeObject = {
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0], 
  };

  employeeObject.timeOutEvents.push(timeObject);
  return employeeObject;
}

const hoursWorkedOnDate = (employeeObject, date) => {
  const timeInEvent = employeeObject.timeInEvents.find(timeInEvent => {
    return timeInEvent.date === date; 
  });

  const timeOutEvent = employeeObject.timeOutEvents.find(timeOutEvent => {
    return timeOutEvent.date === date; 
  });

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

const wagesEarnedOnDate = (employeeObject, date) => {
  const hoursWorked = hoursWorkedOnDate(employeeObject, date);
  const payPerHour = employeeObject.payPerHour;

  return payPerHour * hoursWorked;
}

const allWagesFor = (employeeObject) => {
  const allDatesWorked = employeeObject.timeInEvents.map(timeInEvent => timeInEvent.date);
  const allWages = allDatesWorked.map(date => wagesEarnedOnDate(employeeObject, date));

  return allWages.reduce((total, wage) => {
    return total += wage;
  }, 0);
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(employeeObject => employeeObject.firstName === firstName)
}

const calculatePayroll = (employeeObjectArray) => {
  return employeeObjectArray.reduce((total, employeeObject) => {
    return total += allWagesFor(employeeObject)
  }, 0);
}