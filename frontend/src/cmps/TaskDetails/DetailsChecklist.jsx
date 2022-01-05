import React, { useEffect, useRef } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Checkbox from 'rc-checkbox';
import { ProgressBar } from './ProgressBar';

export function DetailsChecklist({ task, sendTask, togglePopover }) {
  const [listStateVal, createListVal] = React.useState(
    task.checklists ? task.checklists : ''
  );
  const [removedChecklist, setRemovedChecklist] = React.useState(null)
  const hasSentTask = useRef(false)

  useEffect(() => {
    if (!hasSentTask.current) {
      sendTask(false, { ...task, checklists: listStateVal }, removedChecklist);
    }
    hasSentTask.current = true;
  }, [listStateVal, removedChecklist, sendTask, task]);
  const onChange = (e, idx) => {
    hasSentTask.current = false;
    const copyList = [...task.checklists];
    copyList[idx].checked = e.target.checked;
    createListVal(copyList);
  };
  const removeCheck = (idx) => {
    hasSentTask.current = false;
    setRemovedChecklist(task.checklists[idx].title)
    const listCopy = [...task.checklists];
    listCopy.splice(idx, 1);
    createListVal(listCopy);
  };
  const list = task.checklists
    ? task.checklists.map((val, idx) => {
      return (
        <li key={idx} className="checklist-item flex align-center justify-space-between">
          <div>
            <Checkbox
              onChange={(ev) => onChange(ev, idx)}
              checked={val.checked}
              style={{
                marginInline: '2px',
              }}
            />
            <span
              style={{
                marginInlineStart: '17px',
                marginInlineEnd: '17px',
              }}
            >
              {val.title}
            </span>
          </div>
          <button
            style={{
              marginInlineStart: '10px',
            }}
            onClick={() => removeCheck(idx)}
            className='checklist-dots-btn clean-btn'
          >
            <CloseRoundedIcon style={{ fontSize: '18px', color: '#42526e' }} />
          </button>
        </li>
      );
    })
    : '';
  return (
    <div className="checklist-container">
      <ProgressBar task={task} />
      <ul className="clean-list">{list}</ul>
    </div>
  );
}