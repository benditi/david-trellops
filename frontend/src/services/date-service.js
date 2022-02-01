export const dateService = {
    getFormattedDate,
    formatDate
}

function getFormattedDate(someDate) {
    let today = new Date()
    let now = Date.now()
    const todaysStartStamp = now - (360 * 1000 * today.getMinutes()) - (60 * 1000 * today.getSeconds()) - (360 * 60 * 1000 * today.getHours())
    const todaysEndStamp = now + (360 * 1000 * today.getMinutes()) + (60 * 1000 * today.getSeconds()) + (360 * 60 * 1000 * today.getHours())
    const yesterdayStartStamp = todaysStartStamp - (24 * 60 * 60 * 1000)
    const tomorrowStartStamp = todaysStartStamp + (24 * 60 * 60 * 1000)
    //check in case tomorrow/yesterday was in a different month
    if (+someDate >= yesterdayStartStamp && +someDate <= todaysStartStamp) return 'yesterday'
    if (+someDate >= todaysEndStamp && +someDate <= tomorrowStartStamp) return 'tomorrow'
    if (someDate.getFullYear() === today.getFullYear() && someDate.getMonth() === today.getMonth()) {
        if (someDate.getDate() === today.getDate()) return 'today'
        else if (someDate.getDate() === today.getDate() + 1) return 'tomorrow'
        else if (someDate.getDate() === today.getDate() - 1) return 'yesterday'
        else return monthNames[someDate.getMonth()] + ' ' + someDate.getDate() + ', ' + someDate.getFullYear()
    } else return monthNames[someDate.getMonth()] + ' ' + someDate.getDate() + ', ' + someDate.getFullYear()
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatDate(someDateTimeStamp) {
    var dt = new Date(someDateTimeStamp),
        date = dt.getDate(),
        month = monthNames[dt.getMonth()],
        timeDiff = someDateTimeStamp - Date.now(),
        diffDays = new Date().getDate() - date,
        diffMonths = new Date().getMonth() - dt.getMonth(),
        diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
        return "Today";
    } else if (diffYears === 0 && diffDays === 1) {
        return "Yesterday";
    } else if (diffYears === 0 && diffDays === -1) {
        return "Tomorrow";
    } else if (diffYears >= 1) {
        return month + " " + date + ", " + new Date(someDateTimeStamp).getFullYear();
    } else {
        return month + " " + date;
    }
}