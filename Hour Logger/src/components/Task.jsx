import React, { useEffect, useRef } from "react";
import TaskInfo from "./TaskInfo";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const  Task = (props) => {
    const {id, 
        title, 
        category, 
        isRunning, 
        removeHandler, 
        isActive, 
        ticks,
        seconds,
        minutes,
        hours,
        handleOnClick,
        isRunningArr,
        index,
        handleOnExpand,
        taskExpandArr,
        timeLog,
        categoryArr,
        isRunningHandleClick} = props;
    // const [parent, enableAnimations] = useAutoAnimate()


    let foundCat = categoryArr.find((cat)=>(category===cat.name))
    const catColor = foundCat.color
    
    return (
        isRunning ? (
            <div id={id} className="box-content relative object-fill  sticky">
                <div className="title  pr-7 align-middle inline-block float-left w-1/3">
                    {title}
                </div>
                <div className={`category relative right-[110px] px-3 pb-1 rounded-full inline-block bg-[${catColor}] text-white`}>
                    {category}
                </div>

                <div className="time pr-3 w-[28px] float-right text-left relative right-[110px] ">
                    {(hours<10) ? '0' + hours : hours}:
                    {(minutes<10) ? '0' + minutes : minutes}:
                    {(seconds<10) ? '0' + seconds : seconds}
                    {/* , */}
                    {/* {(ticks<10) ? '0' + ticks : ticks} */}
                </div>


            </div> 
        ) : (
            <div id={id} onClick={()=>handleOnExpand(index)} className="grid col-span-3 grid-cols-3 bg-[#2c2c2c] relative h-full  mb-3.5 border border-[0.5px] border-[#1c1c1c] rounded-lg text-white hover:bg-[#282828] cursor-pointer hover:shadow-[0px_0px_10px_1px_#373737]">
                <div className="title ">
                    <button 
                        onClick={(e)=>{
                            e.stopPropagation();
                            handleOnExpand(index)
                        }}
                        className="float-left rounded-full box-content h-5 w-5 top-[15px] left-[10px] cursor-pointer relative hover:bg-neutral-600 active:bg-neutral-700 active:text-neutral-50">
                        {taskExpandArr[index] ? (
                            <svg 
                                fill="rgb(229 229 229)" 
                                viewBox="0 0 32 32" 
                                xmlns="http://www.w3.org/2000/svg" 
                                stroke="rgb(229 229 229)" 
                                strokeWidth="1.184" 
                                className="taskOpener1"
                            >
                                <g id="SVGRepo_iconCarrier">
                                    <path 
                                        d="M15.997 13.374l-7.081 7.081L7 18.54l8.997-8.998 9.003 9-1.916 1.916z">
                                    </path>
                                </g>
                            </svg>
                        ): (
                            <svg 
                                fill="rgb(229 229 229)" 
                                viewBox="0 0 32 32" 
                                xmlns="http://www.w3.org/2000/svg" 
                                stroke="rgb(229 229 229)" 
                                strokeWidth="1.184"
                                className="taskOpener"
                                transform="rotate(180)"
                            >
                                <g 
                                    id="SVGRepo_iconCarrier"
                                >
                                    <path 
                                        d="M15.997 13.374l-7.081 7.081L7 18.54l8.997-8.998 9.003 9-1.916 1.916z"
                                    >
                                    </path>
                                </g>
                            </svg>
                        )}
                        
                        {/* <svg fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em">
                            <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z">
                            </path>
                        </svg> */}
                    </button>
                    <span className="inline-block align-middle relative top-[13px]">{title}</span>
                </div>
                <div className=" p-2 ">
                    <div className={`category w-fit px-3 relative top-[5px] rounded-full bg-[${catColor}] text-white text-center align-middle inline-block align-middle`}>
                        {category}
                        {/* {Array.isArray(isRunningArr)} */}
                    </div>
                </div>
                <div className=" p-2 w-full ">
                    <div className="time px-3 relative top-1.5 float-left inline-block">
                        {(hours<10) ? '0' + hours : hours}:
                        {(minutes<10) ? '0' + minutes : minutes}:
                        {(seconds<10) ? '0' + seconds : seconds}
                        {/* ,{(ticks<10) ? '0' + ticks : ticks} */}
                    </div>
                    <div className="float-right">
                        
                        {isActive && !isRunningArr[index] ?
                            (<div className="relative inline-block w-10 border rounded-full  align-middle select-none border-[0.8px] border-neutral-600 bottom-[5px]" onClick={isRunningHandleClick}>
                                <input 
                                    type="checkbox" 
                                    name="toggle" 
                                    id={`input-${id}`} 
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-neutral-700 appearance-none " 
                                    onChange={() => handleOnClick(index, id)}
                                    checked={isRunningArr[index]}
                                    disabled
                                    />
                               <label htmlFor={`input-${id}`}  className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-700"></label>  
                            </div>
                            ) :
                            (<>
                            <div className=" relative inline-block w-10 m-0 align-middle select-none border rounded-full border-[0.8px] border-neutral-600 bottom-[5px]">
                                <input 
                                    type="checkbox" 
                                    name="toggle" 
                                    id={`input-${id}`}  
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-neutral-700 appearance-none cursor-pointer transition transition-transform" 
                                    onChange={() => handleOnClick(index, id)}
                                    checked={isRunningArr[index]}
                                    />
                                <label htmlFor={`input-${id}`}  className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-700  cursor-pointer"></label> 
                                  
                                  
                            </div>
                            </>)
                        }
                        
                        {/* {isZero ?
                            <button onClick={()=>clearTimeHandler(id)} className='table-cell m-1 rounded-full bg-gray-500 text-gray-300 px-3 pb-0.5' disabled>reset</button> :
                            <button onClick={()=>clearTimeHandler(id)} className='table-cell m-1 rounded-full bg-purple-500 text-white px-3 pb-0.5 active:bg-purple-400'>reset</button>
                        } */}
                        <button 
                            className="inline border-0 rounded-full box-content h-6 w-6 cursor-pointer mx-2  mt-[5px] relative hover:bg-neutral-600 active:bg-neutral-700 active:text-neutral-50 relative top-[1.5px]" 
                            onClick={(e)=>{
                                e.stopPropagation();
                                removeHandler(id)
                                }}>
                                {/* <span className="relative bottom-[1.5px]">x</span> */}
                                <svg fill="rgb(229 229 229)" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="rgb(229 229 229)" strokeWidth="1.184" className="relative left-[2.5px]">
                                    <g id="SVGRepo_iconCarrier"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"></path></g></svg>
                        </button>

                    </div>
                    
                </div>
                {taskExpandArr[index] &&
                <TaskInfo 
                    className="taskInfo"
                    title={title}
                    timeLog={timeLog}
                    unmountOnExit
                />}
            </div> 
          
        )
    )
};


export default React.memo(Task)