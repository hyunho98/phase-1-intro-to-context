// Your code here
function createEmployeeRecord(array) {
    const eRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return eRecord;
}

function createEmployeeRecords(array) {
    const eRecords = array.map(employee => createEmployeeRecord(employee));
    
    return eRecords;
}

function createTimeInEvent(eRecord, date) {
    const splitDate = date.split(' ');
    const event = {
        type: "TimeIn",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    }
    eRecord.timeInEvents.push(event);

    return eRecord;
}

function createTimeOutEvent(eRecord, date) {
    const splitDate = date.split(' ');
    const event = {
        type: "TimeOut",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    }
    eRecord.timeOutEvents.push(event);

    return eRecord;
}

function hoursWorkedOnDate(eRecord, date) {
    const timeInEvents = eRecord.timeInEvents;
    const timeOutEvents = eRecord.timeOutEvents;

    for (let i = 0; i < timeInEvents.length; i++) {
        if (timeInEvents[i].date === date)
            return(timeOutEvents[i].hour - timeInEvents[i].hour) / 100;
    }
    
    return 0;
}

function wagesEarnedOnDate(eRecord, date) {
    return hoursWorkedOnDate(eRecord, date) * parseInt(eRecord.payPerHour);
}

function allWagesFor(eRecord) {
    let total = 0;
    for (const timeOutEvent of eRecord.timeOutEvents) {
        total += wagesEarnedOnDate(eRecord, timeOutEvent.date);
    }

    return total;
}

function calculatePayroll(array) {
    let total = 0;
    for (const eRecord of array) {
        total += allWagesFor(eRecord);
    }

    return total;
}