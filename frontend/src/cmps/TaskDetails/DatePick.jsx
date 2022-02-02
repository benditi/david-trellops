import React, { useState, useEffect, useRef } from 'react';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export function DatePick({ bodyObj }) {
  const { props, setCurrPopover, sendTask, popoverPos } = bodyObj;
  const [startDate, setStartDate] = useState(props.dueDate || Date.now());
  const hasSentTask = useRef(false)
  useEffect(() => {
    if (!hasSentTask.current) {
      sendTask(false, { ...props, dueDate: startDate });
    }
    hasSentTask.current = true
  }, [startDate, props, sendTask]);
  const onSetDate = (date) => {
    hasSentTask.current = false
    const stampDate = Date.parse(date)
    setStartDate(stampDate)
  }

  const removeDate = () => {
    sendTask(false, { ...props, dueDate: '' })
    hasSentTask.current = true
    setCurrPopover(null)
  }
  return (
    <div
      className='date-pick'
      style={(popoverPos.leftPos === 44) ? { left: '25px', top: '40px' } :
        { left: popoverPos.leftPos, top: popoverPos.topPos }}
    >
      <div className='nav-option-header flex align-center'>
        <button className='clean-btn hide'>
          <CloseRoundedIcon />
        </button>
        <h3>Date</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          variant='static'
          openTo='date'
          value={startDate}
          onChange={(date) => onSetDate(date)}
        />
        <button className='remove-btn' onClick={() => removeDate()}>Remove</button>
      </MuiPickersUtilsProvider>
    </div>
  );
}
