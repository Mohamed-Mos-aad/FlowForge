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
        </div>
    );
}

export default Page;