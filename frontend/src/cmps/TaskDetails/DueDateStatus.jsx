export const DueDateStatus =({status})=>{
    return (
        <div className="due-date-status" style={{backgroundColor: status.color,
         color: status.color==='yellow'? 'black':'white'}}>
            {status.phrase}
        </div>
    )
}