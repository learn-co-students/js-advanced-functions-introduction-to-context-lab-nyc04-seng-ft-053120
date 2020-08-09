function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
};

function dateTimeParser(dateTime) {
    let [date, hour] = dateTime.split(' ')
    return {
        date: date,
        hour: parseInt(hour)
    }
};

function timeEvent(type, dateTime) {
    return {
        type: type,
        date: dateTimeParser(dateTime).date,
        hour: dateTimeParser(dateTime).hour
    }
};

function createTimeInEvent(employeeRecord, dateTime) {
    employeeRecord.timeInEvents.push(timeEvent('TimeIn', dateTime))
    return employeeRecord
};

function createTimeOutEvent(employeeRecord, dateTime) {
    employeeRecord.timeOutEvents.push(timeEvent('TimeOut', dateTime))
    return employeeRecord
};

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find((timeInEvent) => timeInEvent.date === date).hour
    let timeOut = employeeRecord.timeOutEvents.find((timeOutEvent) => timeOutEvent.date === date).hour
    return (timeOut - timeIn)/100
};

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
};

function allWagesFor(employeeRecord) {
    let workedDates = employeeRecord.timeInEvents.map((timeInEvent) => timeInEvent.date)
    let wages = workedDates.map((date) => wagesEarnedOnDate(employeeRecord, date))
    return wages.reduce((total, wage) => total + wage)
};

function calculatePayroll(arrayOfEmployees) {
    let wages = arrayOfEmployees.map((employee) => allWagesFor(employee))
    return wages.reduce(((total, wage) => total + wage))
};

function findEmployeeByFirstName(employeeRecords, employeeFirstName) {
    return employeeRecords.find((employeeRecord) => employeeRecord.firstName === employeeFirstName)
}