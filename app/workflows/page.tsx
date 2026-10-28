function Page() {
    return (
        <div className="w-full flex flex-col gap-4 text-[#E3E5E8] p-7">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-[22px] font-bold mb-2">Workflows</h1>
                    <p className="text-[13px] text-[#9197A2]">Automations running in this workspace, with their latest execution health.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#17191D] py-1.75 px-2 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
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
        </div>
    );
}

export default Page;