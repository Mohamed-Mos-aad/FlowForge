export default function NodeForm() {
    return (
        <div>
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <input type="text" name="" id="" defaultValue="Enrich Customer" className="text-[14px] font-bold text-[#E3E5E8] focus:outline-0" />
                <textarea name="" id="" defaultValue="Looks up company and role data." className="w-full resize-none text-[13px] text-[#9197A2] focus:outline-0"></textarea>
                <div className="flex items-center gap-2 text-[11px] text-[#6BC18F]">
                    <span className="w-2 h-2 flex bg-[#6BC18F] rounded-full"></span>
                    Success · 412ms
                </div>
            </div>
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h1 className="text-[11px] text-[#9197A2]">Request</h1>
                <div className="flex gap-1.5">
                    <button className="border border-[#C7F568] rounded-[2px] px-2.25 py-1.25 text-[11px] text-[#C7F568] cursor-pointer">GET</button>
                    <button className="border border-[#2B2E35] rounded-[2px] px-2.25 py-1.25 text-[11px] text-[#9197A2] cursor-pointer">POST</button>
                    <button className="border border-[#2B2E35] rounded-[2px] px-2.25 py-1.25 text-[11px] text-[#9197A2] cursor-pointer">PUT</button>
                    <button className="border border-[#2B2E35] rounded-[2px] px-2.25 py-1.25 text-[11px] text-[#9197A2] cursor-pointer">DELETE</button>
                </div>
                <div className="flex flex-col gap-1.25">
                    <label htmlFor="url" className="text-[11px] text-[#9197A2]">URL</label>
                    <input type="text" name="url" id="url" className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"/>
                </div>
                <div className="flex flex-col gap-1.25">
                    <label htmlFor="authentication" className="text-[11px] text-[#9197A2]">Authentication</label>
                    <input type="text" name="authentication" id="authentication" className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"/>
                </div>
            </div>
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h2 className="text-[11px] text-[#9197A2]">Headers · 2</h2>
                <div className="flex flex-col">
                    <input type="text" name="url" id="url" className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"/>
                    <input type="text" name="url" id="url" className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"/>
                </div>
                <div className="w-full flex gap-2.5">
                    <div className="w-full flex flex-col gap-1.25">
                        <label htmlFor="timeout" className="text-[11px] text-[#9197A2]">Timeout</label>
                        <input type="text" name="timeout" id="timeout" className="w-full bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"/>
                    </div>
                    <div className="w-full flex flex-col gap-1.25">
                        <label htmlFor="retries" className="text-[11px] text-[#9197A2]">Retries</label>
                        <input type="text" name="retries" id="retries" className="w-full bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"/>
                    </div>
                </div>
                <p className="text-[11px] text-[#EF7B63]">Timeout is below p95 latency (412 ms avg). Use at least 1000 ms.</p>
            </div>
            <div className="w-full p-3.5">
                <button className="w-full border border-[#2B2E35] rounded-lg p-2 mt-1.5 cursor-pointer">Test request</button>
            </div>
        </div>
    );
}