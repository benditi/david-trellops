import React, { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { utilService } from '../../services/util-service';

export function Checklist({ bodyObj }) {
  const { props, setCurrPopover, sendTask, popoverPos } = bodyObj;
  const [stateVal, createStateVal] = React.useState({});
  const [listStateVal, createListVal] = React.useState(
    props.checklists ? props.checklists : []
  );

  const hasSentTask = useRef(false)
  useEffect(() => {
    if (!hasSentTask.current) {
      let checklistTitle =
        listStateVal[listStateVal.length - 1]?.title;
      sendTask(
        false,
        { ...props, checklists: listStateVal },
        checklistTitle
      );
      hasSentTask.current = true
    }
  }, [listStateVal, sendTask, props]);

  const pressKey = (ev) => {
    if (ev.keyCode === 13) {
      hasSentTask.current = false
      createListVal([...listStateVal, stateVal]);
      createStateVal({});
    }
  };
  return (
    <div
      className='checklist'
      style={{ left: popoverPos.leftPos, top: popoverPos.topPos }}
    >
      <div className='nav-option-header flex align-center'>
        <button className='clean-btn hide'>
          <CloseRoundedIcon />
        </button>
        <h3>Add checklist</h3>
        <button
          className='clean-btn'
          onClick={() => {
            setCurrPopover(null);
          }}
        >
          <CloseRoundedIcon />
        </button>
      </div>
      <TextField
        fullWidth
        size='small'
        margin='normal'
        variant='outlined'
        placeholder='Enter a title...'
        fontFamily='SourceSans-Light'
        onChange={(ev) =>
          createStateVal({
            id: utilService.makeId(),
            title: ev.target.value,
            checked: false,
          })
        }
        value={stateVal.title ? stateVal.title : ''}
        inputRef={(input) => input && input.focus()}
        onKeyDown={pressKey}
      />
      <div>
        <button
          className='blue-btn checklist-add'
          onClick={() => {
            hasSentTask.current = false
            createListVal([...listStateVal, stateVal]);
            createStateVal({});
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
