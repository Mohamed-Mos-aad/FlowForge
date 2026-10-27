'use client'
// ** Hooks && Tools
import {useState} from "react";
// ** Interfaces
import {logProps} from "@/app/types/types";
interface ExecutionLogProps{
    logs: logProps[]
}



function ExecutionLog({logs}:ExecutionLogProps) {
    // ** States
    const [ isOpenend, setIsOpened ] = useState<boolean>(true);



    // ** Handlers
    const toggleHandler = ()=>{
        setIsOpened(prev => !prev)
    }


    return (
        <div className={`w-full flex flex-col relative shrink-0 ${isOpenend ? "h-1/3" : "h-auto"}`}>
            <div className="flex items-center justify-between absolute top-1.25 right-1.25">
                {
                    isOpenend &&
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-[#9197A2] cursor-pointer"
                        onClick={toggleHandler}
                        aria-label="Close panel"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                }
            </div>
            <ul className="p-2.5 text-[13px] text-[#E3E5E8]">
                <li className="w-fit border-b-2 border-[#C7F568] cursor-pointer" onClick={toggleHandler}>Execution Log</li>
            </ul>
            {
                isOpenend &&
                <div className="h-full flex flex-col overflow-y-scroll">
                    {
                        logs.map((log,index) =>
                            <div className="w-full flex items-center gap-3.5 hover:bg-[#1D2025] border-b border-[#23262C] text-[11px] text-[#E3E5E8] text-nowrap px-3.5 py-1.5 duration-300 cursor-pointer" key={log.time+log.message+log.message+index}>
                                <h1 className="text-[#9197A2]">{log.time}</h1>
                                <div className={`w-1.5 h-1.5 flex rounded-full shrink-0 ${log.success ? 'bg-[#6BC18F]' : 'bg-[#EF7B63]'}`}></div>
                                <h2 className="mr-12.5">{log.title}</h2>
                                <p className="truncate">{log.message}</p>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}



export default ExecutionLog;