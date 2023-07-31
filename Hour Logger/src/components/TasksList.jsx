import React from "react";
import { Task } from './Task';

export const TaskList = (props) => {
    const { 
        tasksArr, 
        isRunningExist, 
        handleOnClick, 
        checkedState, 
        isActive 
    } = props;

    return (
        <div className="w-full grid grid-cols-3  mt-10">
            <div className="border border-r-zinc-400 pb-[7px] border-b-zinc-400 text-[17px] font-bold">Task name</div>
            <div className="border border-b-zinc-400 pb-[7px] text-[17px] font-bold">Category</div>
            <div className="border border-l-zinc-400 pb-[7px] border-b-zinc-400 text-[17px] font-bold">Time</div>             


                {tasksArr && tasksArr.map(({title, id, category, ticks, seconds, minutes, hours, newCategory}, index) => (
                    <Task 
                        title={title} 
                        key={id}
                        id={id} 
                        isRunning={false} 
                        ticks={ticks}
                        seconds={seconds}
                        minutes={minutes}
                        hours={hours}
                        category={category}
                        newCategory={newCategory}
                        isRunningExist={isRunningExist}
                        handleOnClick={handleOnClick}
                        checkedState={checkedState}
                        index={index}
                        isActive={isActive}
                    />
                ))}
        </div>
    )
}