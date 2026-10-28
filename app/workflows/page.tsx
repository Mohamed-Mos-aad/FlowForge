'use client'
// ** Hooks && Tools
import {useRouter} from "next/navigation";
// ** Data
import {WORKFLOWS} from "@/data/test";

function Page() {
    // ** Constants
    const router = useRouter();



    // ** Handler
    const newWorkFlowHandler = ()=>{
        const newId = crypto.randomUUID();
        router.push(`/workflows/${newId}`)
    }
    const openWorkFlowHandler= (id: string)=>{
        router.push(`/workflows/${id}`)
    }



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
                    <h2 className="text-[21px]">{WORKFLOWS.length}</h2>
                </div>
                <div className="lg:border-r border-b lg:border-b-0 border-[#2B2E35] p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Active</span>
                    <h2 className="text-[21px]">17</h2>
                </div>
                <div className="border-r border-[#2B2E35] p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Executions · 24h</span>
                    <h2 className="text-[21px]">3,412</h2>
                </div>
                <div className="p-3 sm:p-4">
                    <span className="block text-[11px] text-[#9197A2] mb-2">Failure rate</span>
                    <h2 className="text-[21px]">1.8%</h2>
                </div>
            </section>
            <section className="flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap gap-1.5">
                    <button className="bg-[#17191D] py-1.75 px-3 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
                        All
                    </button>
                    <button className="bg-[#17191D] py-1.75 px-3 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
                        Active
                    </button>
                    <button className="bg-[#17191D] py-1.75 px-3 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
                        Draft
                    </button>
                    <button className="bg-[#17191D] py-1.75 px-3 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
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
                            </tr>
                        </thead>
                        <tbody className="text-[13px] text-[#E3E5E8]">
                            {
                                WORKFLOWS.map(wf =>
                                    <tr className="cursor-pointer" key={wf.id} onClick={()=>{openWorkFlowHandler(wf.id)}}>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.title}</td>
                                        <td className={`px-3 py-2.25 whitespace-nowrap ${wf.status === "Active" ? 'text-[#6BC18F]' : wf.status === "Failing" ? 'text-[#EF7B63]' : 'text-[#9197A2]'}`}>● {wf.status}</td>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.lastRun}m ago</td>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.success}%</td>
                                        <td className="px-3 py-2.25 whitespace-nowrap">{wf.runs}</td>
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
