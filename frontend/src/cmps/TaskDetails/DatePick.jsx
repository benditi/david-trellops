import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export function DatePick({ bodyObj }) {
  const { props, setCurrPopover, sendTask, popoverPos } = bodyObj;
  const [startDate, setStartDate] = useState(Date.now());
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
  return (
    <div
      className='date-pick'
      style={{ left: popoverPos.leftPos, top: popoverPos.topPos }}
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
      </MuiPickersUtilsProvider>
    </div>
  );
}
