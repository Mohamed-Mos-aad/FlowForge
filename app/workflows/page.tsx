function Page() {
    return (
        <div className="w-full flex flex-col gap-4 text-[#E3E5E8] p-7">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-[22px] font-bold mb-2">Workflows</h1>
                    <p className="text-[13px] text-[#9197A2]">Automations running in this workspace, with their latest execution health.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#17191D] py-1.75 px-3 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
                        Import workflow
                    </button>
                    <button className="bg-[#C7F568] py-1.75 px-3 sm:px-4 border border-[#C7F568] rounded-lg text-[12px] sm:text-[13px] font-semibold text-[#0F1113] cursor-pointer">
                        New workflow
                    </button>
                </div>
            </header>
            <section className="grid grid-cols-4 bg-[#17191D] border border-[#2B2E35]">
                <div className="border-r border-[#2B2E35] p-4">
                    <span className="text-[11px] text-[#9197A2] mb-2">Total workflows</span>
                    <h2 className="text-[21px]">24</h2>
                </div>
                <div className="border-r border-[#2B2E35] p-4">
                    <span className="text-[11px] text-[#9197A2] mb-2">Active</span>
                    <h2 className="text-[21px]">17</h2>
                </div>
                <div className="border-r border-[#2B2E35] p-4">
                    <span className="text-[11px] text-[#9197A2] mb-2">Executions · 24h</span>
                    <h2 className="text-[21px]">3,412</h2>
                </div>
                <div className="p-4">
                    <span className="text-[11px] text-[#9197A2] mb-2">Failure rate</span>
                    <h2 className="text-[21px]">1.8%</h2>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <div className="flex gap-1.5">
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
                <div className="bg-[#17191D] border border-[#2B2E35]">
                    <ul className="grid grid-cols-5 border-b border-[#2B2E35] text-[11px] text-[#9197A2]">
                        <li className="pl-3 py-2.25">Workflow</li>
                        <li className="pl-3 py-2.25">Status</li>
                        <li className="pl-3 py-2.25">Last run</li>
                        <li className="pl-3 py-2.25">Success</li>
                        <li className="pl-3 py-2.25">Runs</li>
                    </ul>
                    <div>
                        <ul className="grid grid-cols-5 text-[13px] text-[#E3E5E8]">
                            <li className="pl-3 py-2.25">Customer Onboarding</li>
                            <li className={`pl-3 py-2.25 ${true ? 'text-[#6BC18F]' : 'text-[#EF7B63]'}`}>● Active</li>
                            <li className="pl-3 py-2.25">2m ago</li>
                            <li className="pl-3 py-2.25">99.2%</li>
                            <li className="pl-3 py-2.25">12,408</li>
                        </ul>
                        <ul className="grid grid-cols-5 text-[13px] text-[#E3E5E8]">
                            <li className="pl-3 py-2.25">Customer Onboarding</li>
                            <li className={`pl-3 py-2.25 ${false ? 'text-[#6BC18F]' : 'text-[#EF7B63]'}`}>● Failing</li>
                            <li className="pl-3 py-2.25">2m ago</li>
                            <li className="pl-3 py-2.25">99.2%</li>
                            <li className="pl-3 py-2.25">12,408</li>
                        </ul>
                        <ul className="grid grid-cols-5 text-[13px] text-[#E3E5E8]">
                            <li className="pl-3 py-2.25">Customer Onboarding</li>
                            <li className={`pl-3 py-2.25 ${false ? 'text-[#6BC18F]' : 'text-[#9197A2]'}`}>● Draft</li>
                            <li className="pl-3 py-2.25">2m ago</li>
                            <li className="pl-3 py-2.25">99.2%</li>
                            <li className="pl-3 py-2.25">12,408</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page;