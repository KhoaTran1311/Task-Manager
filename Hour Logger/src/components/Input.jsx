import React, { useState } from "react"


export const Input = (props) => {
    const {
        categoryArr, 
        onChange, 
        submitHandler, 
        newTask, 
        open, 
        clearCat, 
        setOpen, 
        selectCat, 
        addNewCat} = props;

    return (
        <form  
            onSubmit={submitHandler} 
            className="table p-2 my-5 w-90 mx-auto " > 
            <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Insert Task..." 
                value={newTask.title || ""}
                onChange={onChange} 
                className="table-cell box-border w-high focus:outline-none z-[99] mr-[0.5px] focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-3 border border-zinc-300 w-96 rounded-l-md h-[40px] placeholder-slate-400 hover:drop-shadow-xl hover:bg-zinc-50 "
            />
            
            <div className="custom-select w-full m-auto table-cell ">
                <div className="dropdown border border-zinc-300 border-l-transparent border-r-small w-full cursor-pointer h-[40px] relative bottom-[7px] bg-white" >
                    <div className="categoryDisplay w-full h-full px-2.5 z-10 hover:drop-shadow-xl hover:bg-zinc-50 grid justify-items-start overflow-hidden" onClick={() => setOpen(!open)}>    
                        <span className="relative inline-block align-middle top-[6px] text-left ">
                            {newTask.category ? <span className="newTaskCategory rounded-3xl bg-yellow-300 py-px px-2  ">{newTask.category}</span> : <span className="categorySelector text-slate-400">Select a category...</span>}
                        </span>
                    </div>
                    {open ? (
                        <div className="menu absolute shadow-xl bg-zinc-300 z-50 bg-opacity-80 backdrop-blur-sm list-none pb-1.5 w-full cursor-default border border-zinc-300 rounded-b-lg">
                            <ul className="divide-y-small divide-zinc-400 ">
                                {categoryArr.map((category) => (
                                    <li value={category.name} key={category.id} id={category.id} className="menu-item my-0.5 mx-0 py-0.5 px-2.5 opacity-100 overflow-hidden">
                                        <div 
                                            name="category" 
                                            id="category"
                                            value={category.name}
                                            onClick={() => {selectCat(category.name)}}
                                            className="inline cursor-pointer rounded-3xl bg-yellow-300 text-zinc-950 pb-0.5 px-2.5 hover:bg-yellow-500 hover:text-zinc-700 "
                                        >
                                            <span>{category.name}</span>
                                        </div>
                                        <button 
                                            onClick={()=>clearCat(category.id)} 
                                            className="inline bg-zinc-600 border-0 rounded-full text-zinc-50 content-start content-evenly h-4 w-4 cursor-pointer float-right mt-1.5 relative text-[11px] hover:bg-zinc-500 hover:text-zinc-50 "
                                        >
                                            <span className="relative bottom-[1px]">x</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mr-1.5 mt-2  ml-1.5">
                                <input 
                                    type="text" 
                                    id="newCategory" 
                                    name="newCategory" 
                                    placeholder="New Category..."
                                    value={newTask.newCategory || ""}
                                    onChange={onChange}
                                    className="inline h-3/4 py-px w-9/10 px-1 pl-1.5 focus:outline-none focus:border-sky-500 rounded-l-sm focus:ring-1 focus:ring-sky-500 border border-zinc-600 "
                                /> 
                                <button onClick={addNewCat} className="inline box-content h-[23px] w-1/10 float-right bg-zinc-600 text-zinc-100 active:text-zinc-300 float-right text-[19px] mt-[0.5px] rounded-r-sm relative overflow-hidden">
                                    <span className="relative bottom-[4px]">+</span>
                                </button>
                            </div>  
                        </div>
                    ) : null}
                </div>    
            </div> 
            <button type="submit" className="table-cell h-[40px] font-bold border border-zinc-300 bg-sky-400 text-sky-50 px-3 hover:bg-sky-800 hover:border-sky-400 rounded-r-md">Submit</button> 
        </form>
    )
}
