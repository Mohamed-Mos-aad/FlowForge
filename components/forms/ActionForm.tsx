// ** React Flow
import type {Edge, Node} from "@xyflow/react";
// ** Hooks && Tools
import {useMemo} from "react";
// ** Interfaces
import {NodeData} from "@/app/types/node";
import {logProps} from "@/app/types/types";
import {renderTemplate} from "@/app/lib/template";
interface NodeFormProps {
    node: Node<NodeData>;
    nodes: Node<NodeData>[];
    edges: Edge[];
    onChange: (id: string, data: Partial<NodeData>) => void;
    setExecutionLogs: (log: logProps)=> void
}




export default function ActionForm({node, nodes, edges, onChange, setExecutionLogs}: NodeFormProps) {
    // ** Constants
    const action = node.data.action ?? {};
    const status = node.data.status;
    const resData = useMemo(() => {
        const incoming = edges?.find(edge => edge.target === node.id);
        if (!incoming) return [];

        const src = nodes?.find(n => n.id === incoming.source);
        let out: unknown = src?.data.output;

        if (src?.data.category === "Condition" && incoming.sourceHandle) {
            out = (out as Record<string, unknown> | undefined)?.[incoming.sourceHandle];
        }

        return Array.isArray(out) ? out : out !== undefined ? [out] : [];
    }, [edges, nodes, node.id]);



    // ** Handlers
    const updateActionHandler = (key: string, value: string) => {
        onChange(node.id, {
            action: {
                ...action,
                [key]: value,
            },
        });
    };
    const testActionHandler = ()=>{
        if (resData.length === 0) {
            setExecutionLogs({
                time: new Date().toLocaleTimeString(),
                success: false,
                title: node.data.label,
                message: "No input items. Run the previous node first",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = 0;
        const previews: string[] = [];


        for (const item of resData) {
            const to = renderTemplate(action.to ?? "", item);
            const subject = renderTemplate(action.subject ?? "", item);
            const message = renderTemplate(action.message ?? "", item);

            if (!emailRegex.test(to)) {
                previews.push(`✗ invalid email: "${to}"`);
                continue;
            }
            valid++;
            previews.push(`✓ To: ${to} | Subject: ${subject} | Message: ${message}`);
        }


        const success = valid === resData.length;
        onChange(node.id, { status: { success, ms: 0 } });
        setExecutionLogs({
            time: new Date().toLocaleTimeString(),
            success,
            title: node.data.label,
            message: `${valid}/${resData.length} emails ready\n${previews.join("\n")}`,
        });
    }



    return (
        <div className="h-full overflow-y-auto">
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <input
                    type="text"
                    name="label"
                    id="nodeLabel"
                    value={node.data.label ?? ""}
                    onChange={e => onChange(node.id, { label: e.target.value })}
                    className="text-[14px] font-bold text-[#E3E5E8] focus:outline-0"
                />

                <textarea
                    name="description"
                    id="nodeDescription"
                    value={node.data.description ?? ""}
                    onChange={e => onChange(node.id, { description: e.target.value })}
                    className="w-full resize-none text-[13px] text-[#9197A2] focus:outline-0"
                />

                {status && (
                    <div className={`flex items-center gap-2 text-[11px] ${status.success ? "text-[#6BC18F]" : "text-[#EF7B63]"}`}>
                        <span className={`w-2 h-2 flex ${status.success ? "bg-[#6BC18F]" : "bg-[#EF7B63]"} rounded-full`}></span>
                        {status.success ? "Success" : "Failed"} · {status.ms}ms
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h1 className="text-[11px] text-[#9197A2]">Action Settings</h1>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="actionType" className="text-[11px] text-[#9197A2]">Action Type</label>
                    <select
                        id="actionType"
                        value={action.type ?? "email"}
                        onChange={e => updateActionHandler("type", e.target.value)}
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    >
                        <option value="email">Send Email</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <div className="flex flex-col gap-1.25">
                    <label htmlFor="to" className="text-[11px] text-[#9197A2]">To</label>
                    <input
                        type="text"
                        name="to"
                        id="to"
                        value={action.to ?? ""}
                        onChange={e => updateActionHandler("to", e.target.value)}
                        placeholder="{{email}}"
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>
                <div className="flex flex-col gap-1.25">
                    <label htmlFor="subject" className="text-[11px] text-[#9197A2]">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={action.subject ?? ""}
                        onChange={e => updateActionHandler("subject", e.target.value)}
                        placeholder="Order {{id}} update"
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>
                <div className="flex flex-col gap-1.25">
                    <label htmlFor="message" className="text-[11px] text-[#9197A2]">Message</label>

                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={action.message ?? ""}
                        onChange={e => updateActionHandler("message", e.target.value)}
                        placeholder="Hello {{name}}, your order is {{status}}"
                        className="w-full bg-[#0F1113] border border-[#2B2E35] rounded-[3px] p-2.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568] font-mono resize-none"
                    />
                </div>
            </div>
            <div className="w-full p-3.5">
                <button
                    type="button"
                    onClick={testActionHandler}
                    className="w-full border border-[#2B2E35] rounded-lg p-2 mt-1.5 cursor-pointer hover:bg-[#22252B] text-[11px] text-[#E3E5E8]"
                >
                    Test action
                </button>
            </div>
        </div>
    );
}