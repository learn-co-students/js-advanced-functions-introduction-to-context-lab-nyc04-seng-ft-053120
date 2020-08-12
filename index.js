// Your code here
const createEmployeeRecord = (row) => {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (employeeData) => {
  return employeeData.map((row) => createEmployeeRecord(row));
};

const createTimeInEvent = (employee, dateStamp) => {
  const [date, hour] = dateStamp.split(' ');

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

const createTimeOutEvent = (employee, dateStamp) => {
  const [date, hour] = dateStamp.split(' ');

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

const hoursWorkedOnDate = (employee, soughtDate) => {
  const inEvent = employee.timeInEvents.find((e) => e.date === soughtDate);

  const outEvent = employee.timeOutEvents.find((e) => e.date === soughtDate);

  return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = (employee, dateSought) => {
  const rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
  return parseFloat(rawWage.toString());
};

const allWagesFor = (employee) => {
  const eligibleDates = employee.timeInEvents.map((e) => e.date);
  const payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(employee, d), 0);
  return payable;
};

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find((rec) => rec.firstName === firstName);
};

const calculatePayroll = (arrayOfEmployeeRecords) => {
  return arrayOfEmployeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0);
};
