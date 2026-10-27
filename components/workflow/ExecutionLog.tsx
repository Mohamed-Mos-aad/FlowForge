// ** Interfaces
import {logProps} from "@/app/types/types";
interface ExecutionLogProps{
    logs: logProps[]
}



function ExecutionLog({logs}:ExecutionLogProps) {
    return (
        <div className="w-full h-1/3 flex flex-col">
            <ul className="p-2.5 text-[13px] text-[#E3E5E8]">
                <li className="w-fit border-b-2 border-[#C7F568] cursor-pointer">Execution Log</li>
            </ul>
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
        </div>
    );
}



export default ExecutionLog;