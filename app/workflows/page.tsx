'use client'
// ** Hooks && Tools
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
// ** Interfaces
import {WorkFlowProps} from "@/types/types";
// ** Lib
import {storage} from "@/lib/storage";
import {getTimeAgo} from "@/lib/time";



function Page() {
    // ** States
    const [ workFlowsData, setWorkFlowsData ] = useState<WorkFlowProps[]>([])
    const [ displayedData, setDisplayedData ] = useState<WorkFlowProps[]>(workFlowsData)
    const [ filter, setFilter ] = useState<'All' |'Active' | 'Failing' | 'Draft'>('All');



    // ** Constants
    const router = useRouter();
    const WORKFLOWSNUM = workFlowsData.length;
    const ACTIVEWORKFLOWSNUM = workFlowsData.filter(fw => fw.status === 'Active').length;
    const DRAFTWORKFLOWSNUM = workFlowsData.filter(fw => fw.status === 'Draft').length;
    const FAILURERATE = ()=>{
        const failureNum = workFlowsData.filter(fw => fw.status === 'Failing').length;
        const failureRate = failureNum > 0 ? (( failureNum / WORKFLOWSNUM ) * 100).toFixed(2) : 0;
        return failureRate
    }



    // ** Handler
    const newWorkFlowHandler = ()=>{
        const newId = crypto.randomUUID();
        const newWorkFlow:WorkFlowProps = {
            id: newId,
            title: `new workflow ${workFlowsData.length > 0 ? workFlowsData.length : '' }`,
            status: 'Draft',
            lastRun: 0,
            success: 0,
            runs: 0
        }


        const updatedWorkflows = [...workFlowsData, newWorkFlow];

        storage.set('flowForgeWorkFlows', updatedWorkflows);

        router.push(`/workflows/${newWorkFlow.id}`);
    }
    const deleteWorkFlowHandler = (id: string)=>{
        const updatedWorkflows:WorkFlowProps[] = workFlowsData.filter(wf => wf.id != id);
        storage.set('flowForgeWorkFlows', updatedWorkflows);
        setWorkFlowsData(updatedWorkflows);
        setDisplayedData(updatedWorkflows);
    }
    const openWorkFlowHandler= (id: string)=>{
        router.push(`/workflows/${id}`)
    }
    const filterDataHandler = (filterType: 'All' |'Active' | 'Failing' | 'Draft')=>{
        setFilter(filterType);
        if(filterType === 'All'){
            setDisplayedData(workFlowsData)
        } else {
            const filteredData = workFlowsData.filter(wf => wf.status === filterType);
            setDisplayedData(filteredData)
        }
    }



    // ** UseEffect
    useEffect(()=>{
        const WORKFLOWS:WorkFlowProps[] = storage.get('flowForgeWorkFlows') ?? [];
        setWorkFlowsData(WORKFLOWS);
        setDisplayedData(WORKFLOWS);
    },[])




    return (
        <div className="w-full flex flex-col gap-4 text-[#E3E5E8] p-4 sm:p-5 md:p-7 min-w-0">
            <header className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="min-w-0">
                    <h1 className="text-[22px] font-bold mb-2">Workflows</h1>
                    <p className="text-[13px] text-[#9197A2]">Automations running in this workspace, with their latest execution health.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-[#17191D] py-1.75 px-3 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
                        Import workflow
                    </button>
                    <button
                        className="bg-[#C7F568] py-1.75 px-3 sm:px-4 border border-[#C7F568] rounded-lg text-[12px] sm:text-[13px] font-semibold text-[#0F1113] cursor-pointer whitespace-nowrap"
                        onClick={newWorkFlowHandler}>
                        New workflow
                    </button>
                </div>
            </header>
            <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 bg-[#17191D] border border-[#2B2E35]">
                <div className="border-r border-b lg:border-b-0 border-[#2B2E35] p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Total workflows</span>
                    <h2 className="text-[21px]">{WORKFLOWSNUM}</h2>
                </div>
                <div className="lg:border-r border-b lg:border-b-0 border-[#2B2E35] p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Active</span>
                    <h2 className="text-[21px]">{ACTIVEWORKFLOWSNUM}</h2>
                </div>
                <div className="border-r border-[#2B2E35] p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Draft</span>
                    <h2 className="text-[21px]">{DRAFTWORKFLOWSNUM}</h2>
                </div>
                <div className="p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Failure rate</span>
                    <h2 className="text-[21px]">{FAILURERATE()}%</h2>
                </div>
            </section>
            <section className="flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap gap-1.5">
                    <button
                        className={`bg-[#17191D] py-1.75 px-3 sm:px-3 border ${filter === 'All' ? 'border-[#C7F568]' : 'border-[#2B2E35]'} text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap`}
                        onClick={()=>filterDataHandler('All')}>
                        All
                    </button>
                    <button
                        className={`bg-[#17191D] py-1.75 px-3 sm:px-3 border ${filter === 'Active' ? 'border-[#C7F568]' : 'border-[#2B2E35]'} text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap`}
                        onClick={()=>filterDataHandler('Active')}>
                        Active
                    </button>
                    <button
                        className={`bg-[#17191D] py-1.75 px-3 sm:px-3 border ${filter === 'Draft' ? 'border-[#C7F568]' : 'border-[#2B2E35]'} text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap`}
                        onClick={()=>filterDataHandler('Draft')}>
                        Draft
                    </button>
                    <button
                        className={`bg-[#17191D] py-1.75 px-3 sm:px-3 border ${filter === 'Failing' ? 'border-[#C7F568]' : 'border-[#2B2E35]'} text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap`}
                        onClick={()=>filterDataHandler('Failing')}>
                        Failing
                    </button>
                </div>

                <div className="w-full min-w-0 overflow-x-auto">
                    <table className="w-full min-w-[600px] bg-[#17191D] border border-[#2B2E35]">
                        <thead>
                            <tr className="border-b border-[#2B2E35] text-[11px] text-[#9197A2]">
                                <th className="px-3 py-2.25 text-start">Workflow</th>
                                <th className="px-3 py-2.25 text-start">Status</th>
                                <th className="px-3 py-2.25 text-start">Last run</th>
                                <th className="px-3 py-2.25 text-start">Success</th>
                                <th className="px-3 py-2.25 text-start">Runs</th>
                                <th className="px-3 py-2.25 text-start">actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px] text-[#E3E5E8]">
                            {
                                displayedData.map(wf =>
                                    <tr className="cursor-pointer" key={wf.id} onClick={()=>{openWorkFlowHandler(wf.id)}}>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.title}</td>
                                        <td className={`px-3 py-2.25 whitespace-nowrap ${wf.status === "Active" ? 'text-[#6BC18F]' : wf.status === "Failing" ? 'text-[#EF7B63]' : 'text-[#9197A2]'}`}>● {wf.status}</td>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{getTimeAgo(wf.lastRun)}m ago</td>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.success}%</td>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.runs}</td>
                                        <td className="px-3 py-2.25 flex items-center gap-4">
                                            <button
                                                className="flex items-center cursor-pointer"
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    deleteWorkFlowHandler(wf.id)
                                                }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 6H21M9 6V3H15V6M5 6L6 21H18L19 6M10 10V17M14 10V17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#E3E5E8"/>
                                                </svg>
                                            </button>
                                            <button className="flex items-center cursor-pointer">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 5L19 10M4 15L16 3C16.6667 2.33333 17.3333 2.33333 18 3L21 6C21.6667 6.66667 21.6667 7.33333 21 8L9 20L3 21L4 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#E3E5E8"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Page;
