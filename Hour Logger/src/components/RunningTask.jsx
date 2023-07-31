import React from 'react'
import { Task } from './Task';

export const RunningTask = (props) => {
  const {title, category} = props.runningTask;
  const {
    runningTaskDone, 
    isActive,
    ticks,
    seconds,
    minutes,
    hours} = props;

  return (
    <div className='bg-zinc-800 w-[900px] list-none m-auto rounded-xl text-white p-7 my-5 font-bold text-xl '>
        <Task 
          title={title} 
          isRunning={true} 
          category={category} 
          runningTaskDone={runningTaskDone}
          isActive={isActive}
          ticks={ticks}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
        />
    </div>
  )
};


