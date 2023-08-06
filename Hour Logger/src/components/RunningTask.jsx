import React from 'react'
import Task  from './Task';

const RunningTask = (props) => {
  const {title, category} = props.runningTask;
  const {
    isActive,
    ticks,
    seconds,
    minutes,
    hours,
    categoryArr} = props;
  
  return (
    <div className='bg-[#FAE3E9] w-[900px] list-none m-auto rounded-xl text-black p-7 my-5 font-bold text-xl '>
        <Task 
          title={title} 
          isRunning={true} 
          category={category} 
          isActive={isActive}
          ticks={ticks}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          categoryArr={categoryArr}
        />
    </div>
  )
};

export default React.memo(RunningTask)
