import React from "react";
import  Task  from './Task';
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TaskList = (props) => {
    const { 
        tasksArr, 
        isRunningExist, 
        handleOnClick, 
        isRunningArr, 
        isActive,
        removeHandler,
        handleOnExpand,
        taskExpandArr,
        categoryArr,
        isRunningHandleClick
    } = props;

    const [parent, enableAnimations] = useAutoAnimate()

    return (
        <div className="w-full mt-[50px] px-[50px] w-[1200px] mx-auto left-0">
            {/* grid grid-cols-3  */}
         
                {tasksArr && tasksArr.map(({title, id, category, ticks, seconds, minutes, hours, newCategory, timeLog}, index) => (
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
                        isRunningArr={isRunningArr}
                        index={index}
                        isActive={isActive}
                        removeHandler={removeHandler}
                        handleOnExpand={handleOnExpand}
                        taskExpandArr={taskExpandArr}
                        timeLog={timeLog}
                        categoryArr={categoryArr}
                        isRunningHandleClick={isRunningHandleClick}
                    />
                ))}
        </div>
    )
}

export default React.memo(TaskList)