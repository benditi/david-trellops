import React from 'react'
import Checkbox from 'rc-checkbox';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { dateService } from '../../services/date-service';
import { useEffect } from 'react';
import { DueDateStatus } from './DueDateStatus';
import { useState } from 'react';


export function DetailsDate({ sendTask, task }) {
  const [status, setStatus] = useState(null)
  const onCheckDate = (ev) => {
    sendTask(false, { ...task, isDone: ev.target.checked })
    setStatus(getDueStatus({ ...task, isDone: ev.target.checked }))
  }
  const getDueStatus = (task) => {
    debugger
    if (task.dueDate) {
      const dueStatus = dateService.getDueStatus(task)
      console.log('dueStatus', dueStatus);
      return dueStatus
    }
  }
  useEffect(() => {
    setStatus(getDueStatus(task))
  }, [task])

  return (
    <div className='card-details-date item-container flex column align-flex-end'>
      <h3
        className='card-details-item-header'
        style={{ margin: '0' }}
      >
        Due Date
      </h3>
      <div
        className='date-container flex wrap align-center'
      >
        <label className='checkbox-container'>
          <input
            type="checkbox"
            onChange={(ev) => onCheckDate(ev)}
            checked={task.isDone}
            style={{
              marginInline: '2px',
            }} />
          <span className="checkmark"></span>
        </label>
        <div className="date-item flex"
        >
          {dateService.getFormattedDate(new Date(task.dueDate))}
          {status && <DueDateStatus status={status} />}
        </div>
      </div>
    </div>
  )
}