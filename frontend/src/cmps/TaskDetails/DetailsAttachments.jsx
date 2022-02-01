import React, { useEffect, useRef } from 'react';


export function DetailsAttachments({ task, sendTask }) {
  const [attachmentStateVal, createAttachmentVal] = React.useState(
    task.attachments ? task.attachments : ''
  );
  const hasSentTask = useRef(false)
  useEffect(() => {
    if (!hasSentTask.current) {
      sendTask(false, {
        ...task,
        attachments: attachmentStateVal,
      });
      hasSentTask.current = true
    }
  }, [attachmentStateVal, sendTask, task]);

  const deleteAttachment = (idx) => {
    hasSentTask.current = false
    const attachmentCopy = [...task.attachments];
    attachmentCopy.splice(idx, 1);
    createAttachmentVal(attachmentCopy);
  };
  const attachment = task.attachments
    ? task.attachments.map((val, idx) => {
      return (
        <li key={idx}>
          <img src={val} alt=""/>
          <div className='attachment-txt'>
            <div>
              <h5>{val}</h5>
              <button onClick={() => deleteAttachment(idx)}>Delete</button>
            </div>
          </div>
        </li >

      );
    })
    : '';
  return <ul className="attachment-main-container">{attachment}</ul>;
}
