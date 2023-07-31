import React, {useEffect, useState} from "react";


export const  Task = (props) => {
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
        checkedState,
        index} = props;

    
    return (
        isRunning ? (
            <li id={id} className=" box-content object-fill sticky">
                <div className="title  pr-7 align-middle inline-block float-left w-1/3">
                    {title}
                </div>
                <div className="category relative right-[110px] px-3 pb-1 rounded-full inline-block bg-yellow-300 text-zinc-950">
                    {category}
                </div>

                <div className="time pr-3 w-[28px] float-right text-left relative right-[110px] ">
                    {(hours<10) ? '0' + hours : hours}:{(minutes<10) ? '0' + minutes : minutes}:{(seconds<10) ? '0' + seconds : seconds},{(ticks<10) ? '0' + ticks : ticks}
                </div>


            </li> 
        ) : (
            <div id={id} className="grid col-span-3 grid-cols-3 ">
                <div className="title border border-r-zinc-400 border-b-zinc-400 p-2">
                    <span className="inline-block align-middle relative top-1 ">{title}</span>
                </div>
                <div className="border  border-b-zinc-400 p-2">
                    <div className="category w-fit px-3 relative top-1  rounded-full bg-yellow-300 text-zinc-950 text-center align-middle inline-block align-middle ">
                        {category}
                    </div>
                </div>
                
                <div className="border border-l-zinc-400 border-b-zinc-400 p-2">
                    <div className="time px-3 relative top-1 float-left inline-block">
                        {(hours<10) ? '0' + hours : hours}:{(minutes<10) ? '0' + minutes : minutes}:{(seconds<10) ? '0' + seconds : seconds},{(ticks<10) ? '0' + ticks : ticks}
                    </div>
                    <div className="float-right">
                        
                        {isActive && !checkedState[index] ?
                            (<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input 
                                    type="checkbox" 
                                    name="toggle" 
                                    id={`input-${id}`} 
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none " 
                                    onChange={() => handleOnClick(index, id)}
                                    checked={checkedState[index]}
                                    disabled
                                    />
                                <label htmlFor={`input-${id}`}  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>   
                            </div>
                            ) :
                            (<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input 
                                    type="checkbox" 
                                    name="toggle" 
                                    id={`input-${id}`}  
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" 
                                    onChange={() => handleOnClick(index, id)}
                                    checked={checkedState[index]}
                                    />
                                <label htmlFor={`input-${id}`}  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>   
                            </div>
                            )
                        }
                        
                        {/* {isZero ?
                            <button onClick={()=>clearTimeHandler(id)} className='table-cell m-1 rounded-full bg-gray-500 text-gray-300 px-3 pb-0.5' disabled>reset</button> :
                            <button onClick={()=>clearTimeHandler(id)} className='table-cell m-1 rounded-full bg-purple-500 text-white px-3 pb-0.5 active:bg-purple-400'>reset</button>
                        } */}
                        <button 
                            className="inline bg-zinc-600 border-0 rounded-full text-zinc-50 box-content h-5 w-5 cursor-pointer mx-1  mt-[6px] relative text-[13px] active:bg-zinc-500 active:text-zinc-50 " 
                            onClick={()=>removeHandler(id)}>
                                <span className="relative bottom-[1.5px]">x</span>
                        </button>

                    </div>
                </div>
            </div>             
        )
    )
};
