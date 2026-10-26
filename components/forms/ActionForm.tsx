// ** React Flow
import type {Node} from "@xyflow/react";
// ** Interfaces
import {NodeData} from "@/app/types/node";
interface NodeFormProps {
    node: Node<NodeData>;
    onChange: (id: string, data: Partial<NodeData>) => void;
}




export default function ActionForm({node, onChange}: NodeFormProps) {
    // ** Constants
    const action = node.data.action ?? {};
    const status = node.data.status;



    // ** Handlers
    const updateActionHandler = (key: string, value: any) => {
        onChange(node.id, {
            action: {
                ...action,
                [key]: value,
            },
        });
    };



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
                        value={action.type ?? "send_email"}
                        onChange={e => updateActionHandler("type", e.target.value)}
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    >
                        <option value="send_email">Send Email</option>
                        <option value="db_insert">Insert Database Record</option>
                        <option value="send_notification">Send Push Notification</option>
                        <option value="log_message">Log to Console</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="payload" className="text-[11px] text-[#9197A2]">Payload / Data (JSON)</label>
                    <textarea
                        name="payload"
                        id="payload"
                        rows={4}
                        value={action.payload ?? ""}
                        onChange={e => updateActionHandler("payload", e.target.value)}
                        placeholder='{"key": "{{webhook.body.value}}"}'
                        className="w-full bg-[#0F1113] border border-[#2B2E35] rounded-[3px] p-2.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568] font-mono resize-none"
                    />
                </div>
            </div>

            <div className="w-full p-3.5">
                <button
                    type="button"
                    onClick={() => console.log("Test action:", node.data)}
                    className="w-full border border-[#2B2E35] rounded-lg p-2 mt-1.5 cursor-pointer hover:bg-[#22252B] text-[11px] text-[#E3E5E8]"
                >
                    Test action
                </button>
            </div>
        </div>
    );
}