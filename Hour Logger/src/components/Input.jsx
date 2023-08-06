import React, { useRef, useEffect } from "react"


const Input = (props) => {
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

    let foundCat = newTask.category && categoryArr.find((cat)=>(newTask.category===cat.name))
    const catColor = newTask.category && foundCat.color
    

    return (
        <form  
            onSubmit={submitHandler} 
            className="myElement table left-0 mx-auto w-[1200px] h-[40px] p-[20px] px-[50px] rounded-lg " 
            id="inputHead"
        > 
            
            <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Insert Task..." 
                value={newTask.title || ""}
                onChange={onChange} 
                className="table-cell bg-[#725F64] box-border w-[575px] focus:outline-none z-[99] pl-3  w-96 rounded-l-md h-[40px] text-white placeholder-white hover:drop-shadow-xl"
            />
            
            <div 
                className="custom-select w-full h-[40px] table-cell  " 
                
            >
                <div 
                    className="dropdown w-full cursor-pointer h-full relative bg-[#725F64]" 
                    // onMouseLeave={() => setTimeout(() => setOpen(false), 1000)}
                >
                    <div className="categoryDisplay w-full h-full px-2.5 z-10 hover:drop-shadow-xl grid overflow-hidden" onClick={() => setOpen(!open)}>    
                        <span className="relative inline-block my-auto ">
                            {newTask.category ? <span className={`newTaskCategory  self-center text-white rounded-3xl bg-[${catColor}] py-px px-2 my-auto `}>{newTask.category}</span> : <span className="categorySelector bg-neutral-700 rounded-3xl py-px px-2 my-auto text-white">Select a category...</span>}
                        </span>
                    </div>
                    {open ? (
                        <div className="menu absolute shadow-2xl text-white bg-neutral-700 top-[46px] bg-opacity-70 backdrop-blur-[30px] list-none pb-1.5 w-[100%] cursor-default border border-none rounded-lg z-50">
                            <ul className="divide-y-small divide-neutral-200 ">
                                {categoryArr && categoryArr.map(({name, id, color}) => (
                                    <li  value={name} id={id} key={id} onClick={() => {selectCat(name)}}  className="menu-item py-1 mx-0 pl-2.5 pr-[17px] opacity-100 overflow-hidden cursor-pointer hover:brightness-75 hover:text-neutral-100 hover:bg-opacity-70 hover:rounded-lg hover:bg-neutral-300 hover:backdrop-blur-[18px]">
                                        {/* <div  */}
                                            {/* className="relative  cursor-pointer w-[340.5px] h-[30px]" 
                                            > */}
                                            <div 
                                                name="category" 
                                                id="category"
                                                className={`inline-block rounded-3xl bg-[${color}]  cursor-pointer text-white text-[14px] pb-0.5 px-2.5 `}
                                                
                                            >
                                                <span>{name}</span>
                                            </div>
                                        {/* </div> */}
                                        <button 
                                            onClick={(e)=>{
                                                e.stopPropagation();
                                                clearCat(id)
                                            }} 
                                            className="inline border-0 rounded-full right-[8.5px] h-[17px] w-[17px]  cursor-pointer float-right mt-[5px] relative text-[8.5px] text-neutral-900  hover:bg-opacity-20  hover:bg-neutral-800 active:bg-neutral-300"
                                        >
                                            <span className="relative top-[0.5px] mt-[0.5px] mx-[4.5px]">
                                            <svg aria-hidden="true" className="fill-neutral-50 relative left-[1.5px] bottom-[11.5px]" width="14" height="14" viewBox="0 0 18 18">
                                                <path d="M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41Z">
                                                </path>
                                            </svg>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mx-3 mt-2">
                                <input 
                                    type="text" 
                                    id="newCategory" 
                                    name="newCategory" 
                                    placeholder="New Category..."
                                    value={newTask.newCategory || ""}
                                    onChange={onChange}
                                    className="inline h-3/4 py-px w-9/10 px-1 pl-1.5 focus:outline-none focus:border-sky-500 rounded-l-sm focus:ring-1 focus:ring-sky-500 border text-black "
                                /> 
                                <button onClick={addNewCat} className="inline box-content h-[23px] w-1/10 float-right bg-[#161616] text-white active:text-neutral-300 float-right text-[19px] mt-[0.5px] rounded-r-sm relative overflow-hidden hover:bg-stone-800">
                                    <span className="relative bottom-[4px]">+</span>
                                </button>
                            </div>  
                        </div>
                    ) : null}
                </div>    
            </div> 
            <button type="submit" className="table-cell h-[40px] font-bold bg-[#72BAA7] text-black px-3 hover:bg-[#728D86] rounded-r-md">add</button> 
        </form>
    )
}

export default React.memo(Input)
