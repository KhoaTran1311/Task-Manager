import dayjs from "dayjs";
import React from "react";
import secondsToTime from "../Util";

function TaskInfo(props) {
    const { title, timeLog } = props;

    let date = new Date();


    return (
    <div className="task-info absolute shadow-2xl top-[61px] text-neutral-50 bg-neutral-700 z-50 bg-opacity-70 backdrop-blur-[18px] list-none px-1.5 py-[14px]  w-full cursor-default rounded-lg z-50 ">
        {/* <div className="px-[300px] h-[26px] mb-[7px] w-full border-0 border-b-[3px]  border-b-neutral-200 ">
            <span className=" float-left relative font-bold left-[24px]">Date</span>
            <span className=" float-right relative font-bold right-[0px]">Duration</span>
        </div> */}
        <div className="h-full w-full border-0 border-b-[0px] border-b-neutral-200 border-double">
            {timeLog.length === 0 ? <div className="font-black pb-1">empty...</div> : timeLog.map((element) => {
                return (
                    <div key={dayjs(element.startDate).format('DD/MM/YYYY')} className="px-[300px] mb-[2px] h-[26px] w-full border-0 border-b-[1px] border-b-neutral-200 ">
                        <span className=" float-left relative top-[1px] font-black text-[15px] ">{dayjs(element.startDate).format('DD/MM/YYYY')}</span>
                        <span className=" float-right relative">{secondsToTime(element.duration)}</span>
                    </div>
                )
            })}
        </div>
        {/* <span>{
        timeLog.map(element => {
            return dayjs(element.startDate).format('DD/MM/YYYY')  + ' '
        })
        }</span>
        <span>{
        timeLog.map(element => {
            return secondsToTime(element.duration) + ' '
        })
        }</span> */}
        
    </div>
    )
}

export default React.memo(TaskInfo)
