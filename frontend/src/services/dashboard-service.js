export const dashboardService = {
    getTasksData,
    getTasksPerGroup
}

function getTasksData(board) {
    const tasksPerLabel = {}
    const tasksPerMember = {}
    board.groups.forEach(group => {
        group.tasks.forEach(task => {
            if (task.labels.length) {
                task.labels.forEach(label => {
                    if (tasksPerLabel[label.title]) tasksPerLabel[label.title]++
                    else tasksPerLabel[label.title] = 1
                })
            }
            if (task.members.length) {
                task.members.forEach(member => {
                    if (tasksPerMember[member.fullname]) tasksPerMember[member.fullname]++
                    else tasksPerMember[member.fullname] = 1
                })
            }
        })
    });
    const labelsObject = splitObject(tasksPerLabel)
    const membersObj = splitObject(tasksPerMember)
    const chosenColors = getColors(board, labelsObject.names)
    return { labelsObject, membersObj, chosenColors }
}

function getColors(board, labelTitles) {
    const colors = []
    board.labels.forEach(label => {
        labelTitles.filter(l => {
            if (l === label.title) colors.push(label.color)
        })
    })
    return colors
}

function splitObject(obj) {
    const names = []
    const sums = []
    for (let i in obj) {
        names.push(i)
        sums.push(obj[i])
    }
    return { names, sums }
}

function getTasksPerGroup(board) {
    const tasksPerGroup = []
    const groupsTitles = []
    board.groups.forEach(group => {
        if (!group.title) return //beacuase database has one empty group allways saved
        tasksPerGroup.push(group.tasks.length || 0)
        groupsTitles.push(group.title)
    })
    console.log('tasksPerGroup', tasksPerGroup);
    console.log('groupsTitles', groupsTitles);
    return { groupsTitles, tasksPerGroup }
}
