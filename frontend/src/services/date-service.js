export const dateService = {
    getFormattedDate,
    getDueStatus
}

function getFormattedDate(someDate) {
    let today = new Date()
    let now = Date.now()
    //check in case tomorrow/yesterday was in a different month
    const todaysStartStamp = now - (60 * 1000 * today.getMinutes()) - ( 1000 * today.getSeconds()) - (360 * 1000 * today.getHours())
    const todaysEndStamp = todaysStartStamp + 86400000 //number of milliseconds in one day
    const yesterdayStartStamp = todaysStartStamp - (24 * 60 * 60 * 1000)
    const tomorrowEndStamp = todaysEndStamp + (24 * 60 * 60 * 1000)
    if (+someDate >= yesterdayStartStamp && +someDate < todaysStartStamp) return 'yesterday'
    else if (+someDate > todaysEndStamp && +someDate <= tomorrowEndStamp) return 'tomorrow'
    else if (+someDate >= todaysStartStamp && +someDate <= todaysEndStamp) return 'today'
    else return monthNames[someDate.getMonth()] + ' ' + someDate.getDate() + ', ' + someDate.getFullYear()
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getDueStatus(task){
    if (task.isDone) return {color:'green', phrase:'complete'} //complete
    const todayTimestamp = Date.now()
    if (+task.dueDate - todayTimestamp> 86400000) return {color:'unset', phrase:''} //not soon -more than 24 hours
    if (+task.dueDate - todayTimestamp < 86400000 && +task.dueDate - todayTimestamp>0) return {color:'yellow', phrase:'due soon'} //soon-within the next 24 hours
    if (+task.dueDate - todayTimestamp >= -86400000 ) return {color:'red', phrase:'overdue'} // was yesterday- overdue- less than 24 hours
    if (+task.dueDate - todayTimestamp < -86400000 ) return {color:'lightpink', phrase:'overdue'} //late-overdue more than 24 hours 
}

