import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { useEffect } from 'react';
import { dashboardService } from '../services/dashboard-service';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadBoard, loadBoards
} from '../store/actions/boards-actions.js';
import { useState } from 'react';
export function Dashboard(props) {
    const { board } = useSelector((state) => state.boardModule);
    const dispatch = useDispatch();
    const [data, setData] = useState(null)
    const [membersData, setMembersData] = useState(null)
    const [groupsData, setGroupsData] = useState(null)
    useEffect(() => {
        dispatch(loadBoard(props.match.params.boardId))
        dispatch(loadBoards());
    }, [])
    useEffect(() => {
        if (board._id) {
            setData(dashboardService.getTasksData(board))
            setGroupsData(dashboardService.getTasksPerGroup(board))
        }
        console.log('board:', board);
    }, [board])
    return (
        <section>
            <h1>Dashborad</h1>
            <div className='bar-container' style={{'width': '30%',}}>
                <Bar
                    datasetIdKey='id'
                    data={{
                        labels: data?.labelsObject.names || ['Ron', 'Michael', 'David'],
                        datasets: [
                            {
                                id: 1,
                                label: 'Labels',
                                data: data?.labelsObject.sums || [1, 5, 6],
                                backgroundColor: data?.chosenColors
                            },
                        ],

                    }}
                />
                <Bar
                    datasetIdKey='id'
                    data={{
                        labels: data?.membersObj.names || ['Ron', 'Michael', 'David'],
                        datasets: [
                            {
                                id: 1,
                                label: 'Labels',
                                data: data?.membersObj.sums || [1, 5, 6],
                                backgroundColor: '#3288e8'                            },
                        ],

                    }}
                    options={{indexAxis:'y'}}
                />
                <Bar
                    datasetIdKey='id'
                    data={{
                        labels: groupsData?.groupsTitles || ['Ron', 'Michael', 'David'],
                        datasets: [
                            {
                                id: 1,
                                label: 'Labels',
                                data: groupsData?.tasksPerGroup || [1, 5, 6],
                                backgroundColor: '#3288e8'
                            },
                        ],

                    }}
                    options={{indexAxis:'y'}}
                />
            </div>
        </section>
    )
}